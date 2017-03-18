import React from 'react';

export default state => <div>
  <p>state</p>
  <pre>
    {JSON.stringify(state, null, 2)}
  </pre>
</div>;
