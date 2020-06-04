let oxygen = require("../dist/index.js");
console.log(oxygen.default.interpret(`
    mul 3 4
`));

oxygen.default.Libs.sub = function(a,b){
    return a-b;
}
console.log(oxygen.default.interpret(`
    sub 3 4
`));
