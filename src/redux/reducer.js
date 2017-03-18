/* combine reducer */
import { combineReducers } from 'redux';
import { reducer as sumReduser } from './reducers/sum/reducer';
import { reducer as numbersReduser } from './reducers/numbers/reducer';

export const reducer = combineReducers({
  sum: sumReduser,
  numbers: numbersReduser,
});
