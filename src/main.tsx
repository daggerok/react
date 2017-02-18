import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import 'normalize.css/normalize.css'
import 'bootswatch/paper/bootstrap.css';
import './main.styl';

ReactDOM.render(
  <div>
    hi!
    <span className="glyphicon glyphicon-asterisk"></span>
  </div>,
  document.getElementById('app')
);
