// import React, { Component, cloneElement, createElement } from 'react';
// import React, { cloneElement } from 'react';
import React, { Component } from 'react';

import Nav                  from './Nav';
import Home                 from '../Hone/';
import './App.styl';

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div id="content" class="container-fluid">
          {/* {this.props && this.props.children ? cloneElement(this.props.children, {...this.props}) : createElement('Home')} */}
          {this.props.children}
        </div>
      </div>
    );
  }
}

/*
export default (props) => (
  <div>
    <Nav />
    <div id="content" class="container-fluid">
      {console.log(props)}
      {cloneElement(props.children, {...props})}
    </div>
  </div>
);
*/
