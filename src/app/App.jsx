import React from 'react';

const Padding = props => (
  <div
    style={{
      padding: '2%',
    }}
    {...props}
  />
);

export default (props) => (
  <Padding {...props} />
);
