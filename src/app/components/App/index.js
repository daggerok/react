import React, { Component } from 'react';
import                           './App.styl';

export default class App extends Component {
  render() {
    return (
      <div>
        <div id="content" class="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

