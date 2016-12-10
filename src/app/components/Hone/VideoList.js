import React          from 'react';
import Request        from 'react-http-request';

import VideoListItem  from './VideoListItem';
import {
  base,
  api
} from '../../settings.json';

export default (props) => (
  <div>
    <div id="content"
         class="container-fluid text-center">

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
    </div>
  </div>
);
