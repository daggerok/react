import React from 'react';
import { Link } from 'react-router';

import './Header.styl';
import { base } from '../../../settings.json';

export default () => (
  <header id='nav-header'>
    <Link to={base.href}
          activeClassName='active'>Little Vallery</Link>
  </header>
);
