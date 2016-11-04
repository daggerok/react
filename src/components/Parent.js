import React from 'react';

const doSomething = (value) => {
  console.log(`exec doSomething with payload ${value}`);
};

export default (props) => (
  <div>
    {props.children.map((child, key) => React.cloneElement(child, {...props, key, doSomething}))}
  </div>
);
