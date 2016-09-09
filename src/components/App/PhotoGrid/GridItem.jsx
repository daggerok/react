import React from 'react';
import { Link } from 'react-router';

import { baseHref } from '../../../routes';

export default ({ photo }) => (
  <div>
    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-1">
      <Link to={baseHref + `view/${photo.id}`}>...</Link>
    </div>
  </div>
);
