import * as React from 'react';

const array = [1,2,3,4];

export default () => (
  <div>
    <h3>Reduse:</h3>
    <pre>{array.reduce((prev, curr) => {
      console.log('p', prev, 'c', curr);
      return prev + curr;
    })}</pre>
  </div>
);
