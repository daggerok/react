import { combineReducers } from 'redux';

import CounterReducer from './reducer';

const rootReducer = combineReducers({
  counter: CounterReducer
});

export default rootReducer;
