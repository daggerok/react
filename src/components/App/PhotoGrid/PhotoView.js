import React from 'react';

import './PhotoView.styl';
import { base, api } from '../../../settings.json';

export default (props) => (
  <div>
    <img class='photo-view' alt=""
         src={base.href + api.photos.base + props.params.id}/>
  </div>
);
