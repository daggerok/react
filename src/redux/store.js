import { createStore } from 'redux';
import reducers from './reducers';

const store = (initialState = 0) => createStore(reducers, initialState);
export default store;
