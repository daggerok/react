import React from 'react';
// only for linter, because of webpack provided plugin
import $ from 'jquery';

import GridItem from './PhotoGrid/GridItem';

export default class PhotoGrid extends React.Component {
  constructor() {
    super();
    this.state = { photos: [] };
    this.uri = './api/v1/photos.json';
    this.getPhotos = this.getPhotos.bind(this);
  }

  getPhotos() {
    return $.getJSON(this.uri).then(
      photos => this.setState({ photos }),
      err => console.error('can\'t fetch photos')
    );
  }

  componentDidMount() {
    this.request = this.getPhotos();
  }

  componentWillUnount() {
    if (this.request && this.request.abort) {
      this.request.abort();
    }
  }

  render() {
    return (
      <div class="row">
        {this.state.photos.map((p, id) => <GridItem photo={p} key={id}/>)}
      </div>
    );
  }
}

