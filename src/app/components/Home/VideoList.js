import React                from 'react';

import YouTubeVideoListItem from './YouTubeVideoListItem.js';
import { base, api, }       from '../../settings.json';

export default (props) => (
  <div>
    <ul class='col-md-4 list-group'>
     {props.videos.map((video, key) => <YouTubeVideoListItem key={key}
       onVideoSelect={props.selectVideo}
       video={video} />)}
    </ul>
  </div>
);
