import * as React from 'react';
import * as $ from 'jquery';

export interface HiProps {
  compiler: string;
  framework: string;
}

const url: string = 'http://cdn.shopify.com/s/files/1/0860/3518/products/rightmeow_comp.jpg?v=1432861786';

export class Hi extends React.Component<HiProps, {}> {
  public render() {
    return (
      <div className='content'>
        <h3 className='panel'>hi!</h3>
        <ul>
          <img src={url} alt=''/>
          <li>{this.props.compiler}</li>
          <li>{this.props.framework}</li>
        </ul>
        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    );
  }
}
