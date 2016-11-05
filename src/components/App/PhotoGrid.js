/* eslint no-undef: "off" */

import React from 'react';
import $ from 'jquery';

import { base, api } from '../../settings.json';
import GridItem from './PhotoGrid/GridItem';

export default class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ids: [] };
    this.uri = base.href + api.photos.uri;
    this.getPhotos = this.getPhotos.bind(this);
  }

  getPhotos() {
    return $.getJSON(this.uri).then(
      ids => this.setState({ ids }),
      err => console.error(`can't fetch photos`)
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
        {this.state.ids.map((id, key) => <GridItem {...this.props} key={key} id={id}/>)}
      </div>
    );
  }
}
