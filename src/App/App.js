import React, { Component } from 'react';
import './App.css';
import store from '../redux/store';
import increment from '../redux/actions/counter/increment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.store = store(this.state);
    this.handler = this.handler.bind(this);
    this.unsubscribe = this.store.subscribe(() => {
      const { counter } = this.store.getState();
      this.setState({ counter });
    });
  }
  handler() {
    const action = increment(1 + this.state.counter);
    this.store.dispatch(action);
  }
  componentWillUnmount() {
    if (!this.unsubscribe) return;
    this.unsubscribe();
    this.unsubscribe = null;
  }
  render() {
    return (
      <div className="App" onClick={this.handler}>
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <pre>{this.state.counter}</pre>
        </div>
      </div>
    );
  }
}

export default App;
