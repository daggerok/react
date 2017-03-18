import React from 'react';
import { render } from 'react-dom';
import * as props from './redux/store'
import App from './app/App';

render(
  <App {...props}/>,
  document.querySelector('#app')
);
