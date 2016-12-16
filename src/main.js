import React                from 'react';
import { render }           from 'react-dom';
import $                    from 'jquery';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Application          from './app/Application';
import { base }             from './app/settings.json';

// <base href="/..."/>
$('head')
  .append($('base')
    .attr('href', base.href));


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// bootstrap app
render(
  <Application />,
  document.querySelector('.app')
);
