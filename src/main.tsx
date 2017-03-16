import * as React from 'react';
import { render } from 'react-dom';

import 'bootswatch/paper/bootstrap.css';
import './main.styl';

const Padding = props => (
  <div style={{
    padding: '1%',
  }} {...props}/>
);

render(
  <Padding>
    hi! <span className="glyphicon glyphicon-asterisk"></span>
  </Padding>,
  document.getElementById('app')
);
