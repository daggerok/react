import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hi } from './app/hi.component';

let app: HTMLElement = document.getElementById('app');

ReactDOM.render(
  <Hi
    compiler="TypeScript"
    framework="React"/>,
  app
);
