import React                from 'react';

import VideoListItem        from './VideoListItem';
import YouTubeVideoListItem from './YouTubeVideoListItem.js';
import { base, api, }       from '../../settings.json';

export default ({ videos, selectVideo }) => (
  <div class='video-list'>
    <ul class='col-md-4 list-group'>
     {videos.map((video, key) => <YouTubeVideoListItem key={key}
       onVideoSelect={selectVideo}
       video={video} />)}
    </ul>
  </div>
);

/*
import Request              from 'react-http-request';
// ...
<Request url={base.href + api.videos.uri}
         method='get'
         accept='application/json'
         verbose={false}>
  {
    ({error, result, loading}) => {
      if (loading) {
        return <div>loading...</div>;
      } else {
        const items = result.body;
        return (
          <div>
            {items.map((item, key) => <VideoListItem {...item} key={key} />)}
          </div>
        );
      }
    }
  }
</Request>
*/
