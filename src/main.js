const React       = require('react');
const render      = require('react-dom').render;
const $           = require('jquery');

const Application = require('./app/Application');
const settings    = require('./app/settings.json');

$('head')
  .append($('base')
    .attr('href', settings.base.href));

render(
  <Application />,
  document.querySelector('.app')
);
