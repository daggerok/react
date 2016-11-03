import React from 'react';
import { Link } from 'react-router';

import './Links.styl';

import { baseHref } from '../../../routes';

export default () => (
  <ul class='nav navbar-nav'>
    <li><Link class='text-muted' to={baseHref}>Gallery</Link></li>
    <li><Link class='text-muted' to={baseHref + 'about'}>About</Link></li>
    <li><Link class='text-muted' to={baseHref + 'contact'}>Contact</Link></li>
  </ul>
);
