import React from 'react';

import './PhotoView.styl';
import { base, api } from '../../../settings.json';
// height={$(window).height()*0.8}
export default (props) => (
  <div class='photo-view-container'>
    <img class='photo-view' alt=""
         height={0.9 * $(window).height()}
         src={base.href + api.photos.base + props.params.id}/>

    <span class='image-signature'>
      <h3>модель или сессия<br/>или другая инфа о фото..</h3>
    </span>
  </div>
);
