import React from 'react';

export default ({ change }) => (
  <div class='form-group search-video-bar'>
    <input onChange={event => change(event.target.value)}
           placeholder='search by typing...'
           class='form-control'
           type='text' />
  </div>
);
