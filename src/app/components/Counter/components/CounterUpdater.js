import React, { Component }   from 'react';

export default ({ up, down }) => (
  <div>
    <button
      type='button'
      onClick={e => up()}> + </button>
    <button
      type='button'
      onClick={e => down()}> - </button>
  </div>
);
