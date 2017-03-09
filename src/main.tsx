import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hi } from './components/hi.component';

let app: HTMLElement = document.getElementById('app');

ReactDOM.render(
  <Hi compiler="TypeScript"
      framework="React"/>,
  app
);
