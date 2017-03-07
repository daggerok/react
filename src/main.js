/**
 * Created by mak on 9/6/16.
 */
import './assets';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';

import { href } from './services/BaseHref';
import NotFound from './components/NotFound';
import Main from './components/Main';

const appStyles = {
  padding: '2%',
};

class App extends React.Component {
  constructor() {
    super();
    this.ONE_SECOND = 1000;
    this.state = {seconds: 0};
    this.incrementTimerAndUpdateState =
      this.incrementTimerAndUpdateState.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.incrementTimerAndUpdateState, this.ONE_SECOND)
  }

  incrementTimerAndUpdateState() {
    this.setState({
      seconds: 1 + this.state.seconds,
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div style={appStyles}>
        <div>I am living {this.state.seconds} seconds!</div>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path={href} component={App}>
      <IndexRoute component={Main}/>
      <Route path='home' component={Main}/>
      <Route path='*' component={NotFound}/>
    </Route>
    <Route path='*' component={NotFound}/>
  </Router>,
  document.getElementById('daggerok.github.io.react')
);
