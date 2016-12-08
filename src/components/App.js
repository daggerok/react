/*
import React  from 'react';

import Nav    from './App/Nav';
import './Main.styl';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Nav/>
        <div id="content" class="container-fluid">
          {React.cloneElement(this.props.children, {...this.props})}
        </div>
      </div>
    );
  }
}
*/
import React  from 'react';

import Nav    from './App/Nav';
import './App.styl';

export default (props) => (
  <div>
    <Nav/>
    <div id="content" class="container-fluid">
      {React.cloneElement(props.children, {...props})}
    </div>
  </div>
);
