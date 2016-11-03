import React from 'react';
import { Link } from 'react-router';

import './Header.styl';
import { baseHref } from '../../../routes';

export default () => (
  <header id='nav-header'>
    <Link to={baseHref}
          class=""
          activeClassName='active'>Gallery</Link>
  </header>
);
