/* eslint no-undef: "off" */

import React from 'react';
import { Link } from 'react-router';

import './GridItem.styl';
import { base, api, size } from '../../../settings.json';

const width = $(window).width();
const height = $(window).height();
const curr = width < 320 || height < 568
  ? (width > height ? height : width) : size;

export default class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.prefix = base.href + api.photos.base;
  }

  render() {
    const { id } = this.props;
    return (
      <div class='col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12 grid-container'>
        <Link to={`${base.href}view/${id}`}>
          <figure>
            <img class='grid-item'
                 height={curr}
                 width={curr}
                 src={`${this.prefix}/${id}`}/>
          </figure>
        </Link>
      </div>
    );
  }
}
