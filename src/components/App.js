import React from 'react';

import './App.styl';
import Nav from './App/Nav';

export default ({ children }) => (
  <div>
    <Nav/>
    <div id="content" class="container-fluid">
      {children}
    </div>
  </div>
);
