import React    from 'react';
import { Link } from 'react-router';

import { base } from '../../../settings.json';
import './Header.styl';

export default () => (
  <header id='nav-header'>
    <Link to={base.href}
          activeClassName='active'>Little Vallery</Link>
  </header>
);
