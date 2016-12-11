import React                from 'react';
import Request              from 'react-http-request';

import VideoListItem        from './VideoListItem';
import YouTubeVideoListItem from './YouTubeVideoListItem.js';
import { base, api, }       from '../../settings.json';

export default (props) => (
  <div>
    <div class="container-fluid">
         <ul class="col-md4 list-group">
           {props.videos.map((video, key) => <YouTubeVideoListItem key={key}
             onVideoSelect={props.selectVideo}
             video={video} />)}
         </ul>
    </div>
  </div>
);

/*
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
