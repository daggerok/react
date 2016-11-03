/**
 * @license
 * Copyright daggerok. All rights reserved.
 *
 * Use of this source code is governed by a ISC-style license
 * that can be found in the LICENSE file. at https://github.com/daggerok/angular2/LICENSE
 */
/* eslint no-unused-vars: "off" */

import React from 'react';
import { render } from 'react-dom';

import Application from './routes';

// // <base href="/react/">
// head.write(`<base href=\"http://${document.location.host}${baseHref}\" />`);

const base = document.createElement('base');
base.setAttribute('href', Application.baseHref);

const heads = document.getElementsByTagName('head');
heads[0].append(base);

render(
  <Application />,
  document.getElementById('app')
);
