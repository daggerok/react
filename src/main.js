import React                from 'react';
import { render }           from 'react-dom';
import $                    from 'jquery';

import Application          from './app/Application';
import { base }             from './app/settings.json';

// <base href="/..."/>
$('head')
  .append($('base')
    .attr('href', base.href));

// bootstrap app
render(
  <Application />,
  document.querySelector('.app')
);
