import React from 'react';

export default ({ keyUp }) => (
  <div class='form-group search-video-bar'>
    <input placeholder='search by enter'
           onKeyUp={e => keyUp(e)}
           class='form-control'
           type='text' />
  </div>
);
