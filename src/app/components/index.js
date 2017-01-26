import React from 'react';

import { base } from '../settings.json';

export default ({ children, router }) => (
  <div>
    <div class='navbar' title="React" />

    <div class='container-fluid'>
      {children && React.cloneElement(children)}
    </div>
  </div>
);
