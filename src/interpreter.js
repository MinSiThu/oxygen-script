import {Libs} from "./lib";

//console.log(Libs);

// pipe
const pipe = (...fns)=>{
    return (code)=>{
        return fns.reduce((accumulator,fn)=>fn(accumulator),code);
    }
}

// syntax
const ONumber = ("Number");
const OOperator = ("Operator");
const OString = ("String");

const Table = {
    createDigitSymbol(digit){
        return {
            type:ONumber,
            value:digit,
        }
    },
    createStringSymbol(string){
        return {
            type:OString,
            value:string.slice(1,-1),
        }
    },
    createOperatorSymbol(name){
        return {
            type:OOperator,
            value:name,
            expr:[],
        }
    }
}

//syntax checker
const isDigit = (value)=>/^\d+$/ig.test(value);
const isCompleteString = (value)=>/"[a-aA-Z0-9]+"/ig.test(value);
const isOperator = (value)=>/\w/ig.test(value);

//tokenizer
const tokenize = (code)=>{
   return code.split(/ |\s/);
}

const filterToken = tokens=>tokens.filter(token=>token!="");

//main parse
const parse = (tokens)=>{
    let Program = {};
    
    let counter = 0;
    const peek = ()=>tokens[counter];
    const consume = ()=>tokens[counter++];

    const parseOp = ()=>{
        const node = Table.createOperatorSymbol(consume());
        while (peek()) node.expr.push(parseExpr());
        return node;
    }

    const parseExpr = ()=>{
        let token = peek();
        if(isDigit(token)){
            return Table.createDigitSymbol(consume());
        }else if(isCompleteString(token)){
            return Table.createStringSymbol(consume());
        }else if(isOperator(token)){
            return parseOp();
        }else{
            throw new Error(`${token} is invalid`)
        }
    }
    return parseExpr();
}

//execution
const callstack = [];
const Heap = [];

const exec = (node)=>{
   // console.log(node);
    
    if(node.type == "Operator"){
        if(Libs.hasOwnProperty(node.value)){
            if(node.expr.length == Libs[node.value].length){
                let valuesForFunction = node.expr.map(arg=>{
                    if(arg.type == "Operator"){
                        return exec(arg);
                    }else{
                        return arg.value;
                    }
                })
                return Libs[node.value](...valuesForFunction);
            }else{
                throw new Error(`function:${node.value} has ${Libs[node.value].length} paramters. But fills ${node.expr.length} arguments`);
            }
        }else{
            throw new Error(`${node.value} function is not defined!`)
        }
    }else{
        return node.value;
    }
}

export function interpret(code){
    return pipe(tokenize,filterToken,parse,exec)(code)
}