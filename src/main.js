import './assets';
import React from 'react';
import { render } from 'react-dom';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import { href } from './services/base-href.service';
import NotFound from './components/not-found.component';
import Main from './components/main.component';
import Nav from './components/nav.component';

const appStyles = {
  padding: '2%',
};

class App extends React.Component {
  constructor() {
    super();
    this.ONE_SECOND = 1000;
    this.state = { seconds: 0 };
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
      <div>
        <Nav/>
        <div style={appStyles}>
          <div>I am living {this.state.seconds} seconds!</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

// bootstrap
render(
  <Router basename={href}>
    <Switch>
      <Route path='' component={App}/>
      <Route exact={true} path='/main' component={Main}/>
      <Redirect from='/home' to='/main'/>
      <Route component={NotFound}/>
    </Switch>
  </Router>,
  document.getElementById('app')
);
