import React from 'react';

export default ({ keyUp }) => (
  <div class='form-group search-video-bar'>
    <input onKeyUp={e => keyUp(e)}
           class='form-control'
           type='text' />
  </div>
);
