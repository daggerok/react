import React from 'react';
import { Link } from 'react-router';

import './GridItem.styl';
import { base, api, size } from '../../../settings.json';

export default class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.prefix = base.href + api.photos.base;
  }

  render() {
    const { id } = this.props;
    return (
      <div class='col-xl-2 col-lg-3 col-md-4 col-xs-6'>
        <Link to={`${base.href}view/${id}`}>
          <figure>
            <img class='thumbnail grid-item'
                 height={size}
                 width={size}
                 src={`${this.prefix}/${id}`}></img>
          </figure>
        </Link>
      </div>
    );
  }
}
