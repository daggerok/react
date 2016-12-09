import React, { cloneElement }  from 'react';

import Nav                      from './App/Nav';
import './App.styl';

export default (props) => (
  <div>
    <Nav />
    <div id="content" class="container-fluid">
      {cloneElement(props.children, {...props})}
    </div>
  </div>
);
