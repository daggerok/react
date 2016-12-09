import React from 'react';
import { render } from 'react-dom';

import Application from './app/routes';
import { base } from './app/settings.json';

const headElement = document.getElementsByTagName('head')[0];
const baseElement = document.createElement('base');
const { href } = base;

baseElement.setAttribute('href', href);
headElement.append(baseElement);

render(
  <Application />,
  document.querySelector('.app')
);
