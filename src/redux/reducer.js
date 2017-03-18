/* combine reducer */
import { combineReducers } from 'redux';
import { reducer as sumReduser } from './sum/reducer';
import { reducer as numbersReduser } from './numbers/reducer';

export const reducer = combineReducers({
  sum: sumReduser,
  numbers: numbersReduser,
});
