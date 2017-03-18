import React from 'react';
import ReactDOM from 'react-dom';

import * as redux from './redux/store';
import App from './app/App';

ReactDOM.render(
  <App store={...redux}/>,
  document.querySelector('#app')
);
