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

import settings from './settings.json';

const base = document.createElement('base');
base.setAttribute('href', settings.base.href);

const heads = document.getElementsByTagName('head');
heads[0].append(base);

import Parent from './components/Parent';
import Child from './components/Child';

render(
  <Parent>
    <Child value="1"/>
    <Child value="2"/>
  </Parent>,
  document.getElementById('app')
);
