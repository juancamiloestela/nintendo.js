/*!
 * Nintendo.js
 * http://www.github.com/juancamiloestela/nintendo.js
 * MIT licensed
 * Version 0.1
 *
 * Copyright (C) 2013 Juan Camilo Estela http://www.mecannical.com
 */

(function(){
	'use strict';

	var callbacks = {},
		stack = [],
		pressed = [];

	function combo(character, callback){
		character = character.replace(/\s/g,'');

		if (!callbacks[character]){
			callbacks[character] = [];
		}

		if (typeof callback === 'function'){
			callbacks[character].push(callback);
		}
	}

	function ignore(keyCode, callback){
		var i;

		if (!callback){
			callbacks[keyCode] = [];
		}else{
			for (i in callbacks[keyCode]){
				if (callbacks[keyCode][i] === callback){
					delete(callbacks[keyCode][i]);
				}
			}
		}
	}


	function parseCharacterMatching(e){
		var character = false,
			keyCode = e.keyCode,
			ctrl = e.ctrlKey || e.metaKey,
			shift = e.shiftKey,
			alt = e.altKey;

		if (keyCode >= 65 && 90 >= keyCode && !shift){
			character = String.fromCharCode(keyCode).toLowerCase();
		}else if (keyCode >= 65 && 90 >= keyCode && shift){
			character = String.fromCharCode(keyCode).toUpperCase();
		}else if (keyCode >= 97 && 122 >= keyCode){
			character = String.fromCharCode(keyCode).toLowerCase();
		}else if(keyCode >= 48 && 57 >= keyCode){
			character = String.fromCharCode(keyCode);
		}else{
			var codes = {
					8: 'BACKSPACE',
					9: 'TAB',
					13: 'RETURN',
					16: 'SHIFT',
					17: 'CTRL',
					18: 'ALT',
					27: 'ESC',
					32: 'SPACE',
					37: 'LEFTARROW',
					38: 'UPARROW',
					39: 'RIGHTARROW',
					40: 'DOWNARROW',
					46: 'DELETE',
					91: 'META',
					93: 'META'
				};
			character = codes[keyCode] || false;
		}
		return character;
	}

	function matches(combo, input, placeholders){
		var i = combo.indexOf('*'),
				character = '',
				match = [];

		while (i !== -1){
			character = input.substr(i,1);
			match.push(character);
			combo = combo.replace('*', character);
			i = combo.indexOf('*');
		}
		
		if (input === combo){
			return match;
		}
		return false;
	}

	function keyDown(e){
		var character = parseCharacterMatching(e),
			clearStack = true,
			i,
			j,
			combo,
			m = [];

		if (pressed.indexOf(character) === -1){
			pressed.push(character);
		}
		
		if (pressed.length > 1){
			for (j = 0; j < pressed.length - 1; j++){
				stack.pop();
			}
		}

		stack.push(pressed.join('+'));
		combo = stack.join(',');

		for (i in callbacks){
			if (!!(m = matches(i, combo))){
				for (j in callbacks[i]){
					callbacks[i][j](e, m);
				}
				stack = [];
				pressed = [];
				return;
			}

			if((new RegExp('^'+combo.replace('+','\\+'), 'g')).test(i)){
				clearStack = false;
			}
		}

		if (clearStack){
			pressed = [];
			stack = [];
		}
	}


	function keyUp(e){
		var i,
			character = parseCharacterMatching(e);

		for (i in pressed){
			if (pressed[i] === character){
				pressed.splice(i,1);
			}
		}
	}

	(function init(){
		document.body.addEventListener('keydown', keyDown, false);
		document.body.addEventListener('keyup', keyUp, false);
	})();

	window.Nintendo = {
		combo: combo
	};

})();


