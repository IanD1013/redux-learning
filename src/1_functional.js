function sayHello() {
  return 'Hello, World!';
}

// Assign a function to a variable
let fn = sayHello;

// Pass a function as an argument to another function
function greet(fnMessage) {
    console.log(fnMessage());
}

greet(sayHello)

// Return a function from another function
function sayHello2() {
    return function() {
        return 'Hello, World!';
    }
}

/** Function Composition */
let input = '   JavaScript   ';
let output = '<div>' + input.trim() + '</div>';

const trim = str => str.trim();
const wrapInDiv = str => `<div>${str}</div>`;
const toLowerCase = str => str.toLowerCase();

const result = wrapInDiv(toLowerCase(trim(input)));