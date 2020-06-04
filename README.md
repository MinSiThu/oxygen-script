# oxygen-script
 a function extension of javascript

## Installation
```js
npm i oxygen-script
```

In browser
```js
<script src="https://unpkg.com/oxygen-script@1.0.2/dist/index.js"></script>
```

It adds an extension of function style writing to javascript and provides a syntatic sugar for functional programming.

Then, this is example code
```js
let oxygen = require("oxygen-script");
console.log(oxygen.default.interpret(`
    mul 3 4
`));
```

By default , oxygen has only three functions.
- add - add two number values
- mul - add two string values
- concat - concat string,number values
These functions accepts only two arguments.

You can extends your own function in oxygen script.
```js
// extend sub function in oxygen-script
oxygen.default.Libs.sub = function(a,b){
    return a-b;
}
console.log(oxygen.default.interpret(`
    sub 3 4
`));
```

## RoadMap
SpaceBar in String are not still implemented yet.
Will implement soon.
```js
concat "Java Script" //=> produces an error
```