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