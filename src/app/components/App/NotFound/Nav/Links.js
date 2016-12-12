import React    from 'react';
import { Link } from 'react-router';
import               './Links.styl';
import { base } from '../../../../settings.json';

const { href } = base;

export default () => (
  <ul class='nav navbar-nav'>
    <li>
      <Link class='text-muted'
            to={href}>Counter</Link>
    </li>
    <li>
      <Link class='text-muted'
            to={href + 'tube'}>Top 5 tube)</Link>
    </li>
  </ul>
);
