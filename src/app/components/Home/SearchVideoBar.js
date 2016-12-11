import React from 'react';

export default ({ keyUp }) => (
  <div class='form-group-inline col-md-6 search-video-bar'>
    <input onKeyUp={event => keyUp(event)}
           placeholder='search by enter'
           class='form-control'
           type='text' />
  </div>
);
