import React from 'react';

export default (props) => (
  <div class="form-group">
    <input onChange={e => props.itemChanged(e)}
           onKeyUp={e => props.keyUp(e)} 
           type='text'
           class='form-control-static' />
  </div>
);