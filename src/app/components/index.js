import React from 'react';

import { base } from '../settings.json';

export default ({ children, router }) => (
  <div>
    <div classs='navbar'
      title="React Material UI"
      onTitleTouchTap={e => router.push(base.href)}
      iconClassNameRight="muidocs-icon-navigation-expand-more" />

    <div class='container-fluid'>
      {children && React.cloneElement(children)}
    </div>
  </div>
);
