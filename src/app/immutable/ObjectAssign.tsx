import * as React from 'react';

let person = {
  fname: 'Billy',
  mname: 'Bob',
  lname: 'Thornton',
};

declare const Object: any;
let newPerson = Object.assign({}, person, {
  age: 43
});

console.dir(person);
console.dir(newPerson);
console.log(person == newPerson);
console.log(person === newPerson);

let { fname: fn, lname: ln } = newPerson;
console.log(fn, ln);

export default props => (
  <div>
    <h3>Object.assign:</h3>
    <pre>{JSON.stringify(person, null, 2)}</pre>
    <pre>{JSON.stringify(newPerson, null, 2)}</pre>
  </div>
);
