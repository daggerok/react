import React, { Component } from 'react';

import SearchVideoBar       from './SearchVideoBar';
import VideoDetails         from './VideoDetails';
import VideoList            from './VideoList';

export default class Home extends Component {
  constructor() {
    super();
    this.log = this.log.bind(this);
  }
  log(event) {
    console.log('target', event.target.value);
  }
  render() {
    return (
      <div>
        <SearchVideoBar log={this.log} />
        <VideoDetails />
        <VideoList />
      </div>
    );
  }
}

/*
const log = (event) => console.log('target', event.target.value);

export default (props) => (
  <div>
    <SearchVideoBar log={log} />
    <VideoDetails />
    <VideoList />
  </div>
);
*/
