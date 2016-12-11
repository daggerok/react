import React    from 'react';

import { api }  from '../../settings.json';

export default ({ video }) => {

  if (!video) {
    return <div>loading...</div>;
  }

  return (
    <div class='col-md-8 video-details'>
      <div class='embed-responsive embed-responsive-16by9 video-details-heading'>
        <iframe
          src={`${api.youtube.base}/embed/${video.id.videoId}`}
          class='embed-responsive-item'></iframe>
      </div>
      <div class='list-group-item video-details-footer'>
        <h4>{video.snippet.title}</h4>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  );
};
