import * as React from 'react';

let person = [
  'Billy',
  'Bob',
  'Thornton',
];

let newPerson = person.slice(1);
let newPerson2 = person.concat('age 43');

console.dir(person);
console.dir(newPerson);
console.dir(newPerson2);

let [ fn, mn, ...rest ] = newPerson2;
console.log(fn, mn, rest);

export default props => (
  <div>
    <h3>Array.concat:</h3>
    <pre>{JSON.stringify(person, null, 2)}</pre>
    <pre>{JSON.stringify(newPerson, null, 2)}</pre>
    <pre>{JSON.stringify(newPerson2, null, 2)}</pre>
  </div>
);
