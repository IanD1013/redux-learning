import { compose, pipe } from 'lodash/fp';
import { produce } from 'immer';

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

/** Composing and Piping */
const transform = compose(wrapInDiv, toLowerCase, trim);
transform(input);

const transform2 = pipe(trim, toLowerCase, wrapInDiv); // list of functions to be executed in order
transform2(input);

/** Currying */
const wrapInSpan = str => `<span>${str}</span>`;
const wrap = (type, str) => `<${type}>${str}</${type}>`;

const transform3 = pipe(trim, toLowerCase, wrap); // get <javascript>undefined</javascript>

// function add(a, b) {
//     return a + b;
// }

function add(a) {
    return function(b) {
        return a + b;
    }
}

const add2 = a => b => a + b;
const wrap2 = type => str => `<${type}>${str}</${type}>`;
const transform4 = pipe(trim, toLowerCase, wrap2('div'));

/** Updating Objects */
const person = { name: 'John' };
const updated = Object.assign({}, person, { name: 'Bob', age: 30 });
const updated2 = { ...person, name: 'Bob' };    

const person2 = {
    name: 'John',
    address: {
        country: 'USA',
        city: 'San Francisco'
    }
}

const updated3 = {
    ...person2,
    address: {
        ...person.address,
        city: 'New York'
    },
    name: 'Bob'
}

/** Updating Arrays */
const numbers = [1, 2, 3];

// Adding
const added = [...numbers, 4];
const index = numbers.indexOf(2);
const added2 = [...numbers.slice(0, index), 4, ...numbers.slice(index)];

// Removing
const removed = numbers.filter(n => n !== 2);

// Updating
const updated4 = numbers.map(n => (n === 2 ? 20 : n));

/** Immer */
let book = { title: 'Harry Potter' };

function publish(book) {
    return produce(book, draftBook => {
        draftBook.isPublished = true;
    });
}