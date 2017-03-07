/**
 * Created by mak on 9/6/16.
 */
import React from 'react';
import { Link } from 'react-router';
import { href } from '../services/BaseHref';

export default () => (
  <ul>
    <li><Link to={href}>root</Link></li>
    <li><Link to={href + "home"}>home</Link></li>
    <li><Link to={href + "not-found"}>not-found</Link></li>
  </ul>
);
