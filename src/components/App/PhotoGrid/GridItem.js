import React from 'react';
import { Link } from 'react-router';

import { base } from '../../../settings.json';

export default class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class='col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-1'>
        <Link to={`${base.href}view/${this.props.photo.id}`}>
          <img width='100%' height='100%' src={base.href + this.props.photo.uri}></img>
        </Link>
      </div>
    );
  }
}
