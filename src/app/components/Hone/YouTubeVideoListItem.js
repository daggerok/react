import React from 'react';
// href={'https://www.youtube.com/watch?v=' + props.id.videoId}>
export default ({ video, onVideoSelect }) => (
  <li class='list-group-item youtube-video-list-item'>
    <div class='media'>
      <a onClick={e => onVideoSelect(video)}>
        <h4 class='media-body'>{video.snippet.title}</h4>
        <div class='media-object'>
          <img src={video.snippet.thumbnails.default.url} />
        </div>
      </a>
    </div>
  </li>
);
