import React from 'react';

export default ({ doSomething, value }) => (
  <div onClick={() => doSomething(value)}>
    child {value}
  </div>
);
