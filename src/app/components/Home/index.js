import React, { Component } from 'react';
import                           './Home.styl';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'test',
    };
  }

  render() {
    return (
      <div>
        Home page
      </div>
    );
  }
}
