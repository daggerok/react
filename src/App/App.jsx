import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import increment from '../redux/actions/counter/increment';

const App = ({ counter, dispatch }) => { // passed via react-redux connect fuction
  const handler = () => {
    const action = increment(counter + counter);
    dispatch(action);
  }
  return (
    <div className="App" onClick={handler}>
      <div className="App-header">
        <h2>Welcome to React</h2>
      </div>
      <div className="App-intro">
        <pre>{counter}</pre>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  // // console.log('ownProps', ownProps);
  // console.log('state', state);
  return { counter: state.counter };
}

// export default App;
export default connect(mapStateToProps)(App);
