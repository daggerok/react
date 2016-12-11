import React from 'react';

export default ({ change }) => (
  <div class='form-group-inline col-md-6 search-video-bar-by-typing'>
    <input onChange={event => change(event.target.value)}
           placeholder='search by typing...'
           class='form-control'
           type='text' />
  </div>
);
