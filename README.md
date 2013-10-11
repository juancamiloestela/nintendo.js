# Nintendo.js

A key combo event handler for js.
(http://juancamiloestela.github.io/nintendo.js)[http://juancamiloestela.github.io/nintendo.js/]

## Installation

Just include the nintendo.js file in your html.

## Usage

Nintendo.js works by detecting key combos. These can be used to trigger hidden functionalities or control elements in your site with keyboard commands.

Press the letter 'd'.

```
Nintendo.combo('d', function(){
	console.log('Combo: d');
});
```

To use capitals the SHIFT key is assumed.

```
Nintendo.combo('SHIFT + D', function(){
	console.log('Combo: SHIFT + D');
});
```

Combos can be simultaneous, press the alt key and 'd' at the same time.

```
Nintendo.combo('ALT + d', function(){
	console.log('Combo: ALT + d');
});
```

Combos can be sequential, press 'a', then 'b', then 'c'.

```
Nintendo.combo('a, b, c', function(){
	console.log('Combo: a, b, c');
});
```

Combos can also mix sequential and simultaneous commands, press 'a', then ALT + 'r'.

```
Nintendo.combo('a, ALT + r', function(){
	console.log('Combo: a, ALT + r');
});
```

You can use letters, numbers and special keys like ALT, CTRL, META, RETURN, TAB, SHIFT, LEFTARROW, UPARROW, RIGHTARROW, DOWNARROW. Press 'e', then '5', then the up arrow.

```
Nintendo.combo('e, 5, UPARROW', function(){
	console.log('Combo: e, 5, UPARROW');
});
```

How about a classic nintendo combo! a, b, a, a, UPARROW, DOWNARROW, a.

```
Nintendo.combo('a, b, a, a, UPARROW, DOWNARROW, a', function(){
	console.log('1 up!');
});
```

You can also control the event flow. Click on the text area an type 1,2,3. We are preventing the default behavior on the last key so when the combo is triggered, the number 3 will not appear on the textarea.

```
Nintendo.combo('1,2,3', function(e){
	e.preventDefault();
	console.log('Combo: 1, 2, 3');
});
``