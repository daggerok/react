import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

import Application from './app/routes';
import settings from './app/settings.json';

$('head')
  .append($('base')
    .attr('href', settings.base.href));

render(
  <Application />,
  document.querySelector('.app')
);
