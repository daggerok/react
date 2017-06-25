import React from 'react';
import App from './App/App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';

const initialState = { counter: 1 };
const singletonInstance = store(initialState);

export default () => <Provider store={singletonInstance}>
  <App />
</Provider>;
