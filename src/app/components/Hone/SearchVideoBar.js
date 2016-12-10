import React from 'react';

export default (props) => (
  <div class="form-group">
    <input onChange={e => props.log(e)} type='text' class='form-control-static' />
  </div>
);
