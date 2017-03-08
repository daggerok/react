import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './main.styl';

ReactDOM.render(
  <div>
    <div className="padding-1-percent">
      hi!
      <span className="glyphicon glyphicon-asterisk"></span>
    </div>
  </div>,
  document.querySelector('#app')
);
