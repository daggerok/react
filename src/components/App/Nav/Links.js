import React from 'react';
import { Link } from 'react-router';

import './Links.styl';

// base.href
import { base } from '../../../settings.json';

export default () => (
  <ul class='nav navbar-nav'>
    <li><Link class='text-muted' to={base.href}>Gallery</Link></li>
    <li><Link class='text-muted' to={base.href + 'about'}>About</Link></li>
    <li><Link class='text-muted' to={base.href + 'contact'}>Contact</Link></li>
  </ul>
);
