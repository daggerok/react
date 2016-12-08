/**
 * @license
 * Copyright daggerok. All rights reserved.
 *
 * Use of this source code is governed by a ISC-style license
 * that can be found in the LICENSE file. at https://github.com/daggerok/angular2/LICENSE
 */
/* eslint no-unused-vars: "off" */
import React        from 'react';
import { render }   from 'react-dom';
import $            from 'jquery';

import Application  from './routes';
import settings     from './settings.json';

$('head')
  .append($('base')
    .attr('href', settings.base.href));

render(
  <Application />,
  document.getElementById('app')
);
