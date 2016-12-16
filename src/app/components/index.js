import React    from 'react';
import { Link } from 'react-router';
import AppBar   from 'material-ui/AppBar';

import { base } from '../settings.json';

export default ({ children, router }) => (
  <div>
    <AppBar
      title="React Material UI"
      onTitleTouchTap={e => router.push(base.href)}
      iconClassNameRight="muidocs-icon-navigation-expand-more" />

    <div class='container-fluid'>
      {children && React.cloneElement(children)}
    </div>
  </div>
);
