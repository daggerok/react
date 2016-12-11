import React, { Component } from 'react';
import YouTubeSearch        from 'youtube-api-search';

import SearchVideoBar       from './SearchVideoBar';
import VideoDetails         from './VideoDetails';
import VideoList            from './VideoList';
import { api }              from '../../settings.json';

import './Home.styl';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      curr: null,
    };
    this.onItemChanged = this.onItemChanged.bind(this);
  }
  componentDidMount() {
    YouTubeSearch(
      { key: api.youtube.key, term: 'react' },
      (videos) => this.setState({
        videos,
        curr: videos[0] || {}
      })
    );
  }
  onItemChanged(event) {
    console.log('target', event.target.value);
  }
  onKeyUp(event) {
    console.log('code', event.charCode);
  }
  render() {
    return (
      <div>
        <SearchVideoBar
          keyUp={this.onKeyUp}
          itemChanged={this.onItemChanged} />
        <VideoDetails video={this.state.curr} />
        <VideoList
          selectVideo={curr => this.setState({ curr })}
          videos={this.state.videos} />
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
