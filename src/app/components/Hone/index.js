import React, { Component } from 'react';
import YouTubeSearch        from 'youtube-api-search';
import                           './Home.styl';
import SearchVideoBar       from './SearchVideoBar';
import VideoDetails         from './VideoDetails';
import VideoList            from './VideoList';
import { api }              from '../../settings.json';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: 'react',
      videos: [],
      curr: null,
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.search = this.search.bind(this);

    this.enter = () => 13;
  }

  componentDidMount() {
    this.search();
  }

  search() {
    YouTubeSearch(
      {
        key: api.youtube.key,
        term: this.state.term,
      },
      (videos) => this.setState({
        videos,
        curr: videos[0] || {},
      })
    );
  }

  onKeyUp(event) {
    const { target, keyCode } = event;
    this.setState({ term: target.value });
    if (this.enter() === keyCode) {
      target.value = '';
      this.search();
    }
  }

  render() {
    return (
      <div>
        <SearchVideoBar keyUp={this.onKeyUp} />
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
