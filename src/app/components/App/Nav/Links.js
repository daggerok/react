import React    from 'react';
import { Link } from 'react-router';

import { base } from '../../../settings.json';
import './Links.styl';

const { href } = base;

export default () => (
  <ul class='nav navbar-nav'>
    <li>
      <Link class='text-muted'
            to={href}>Home</Link>
    </li>
    <li>
      <Link class='text-muted'
            to={href + 'some'}>try not-found</Link>
    </li>
  </ul>
);
