/* combine reducers start */
import {
  createStore,
  combineReducers,
} from 'redux';
import { reducer as sumReduser } from './reducers/sumReducer';
import { reducer as numbersReduser } from './reducers/numbersReducer';

export const store = createStore(combineReducers({
  sum: sumReduser,
  numbers: numbersReduser,
}));
/* combine reducers end */

/** sum dispatcher helpers start */
import { actionTypes as sumActionTypes } from './reducers/sumReducer';
import { optional } from './reducers/util';

export const dispatchPlus = value => store.dispatch({
  type: sumActionTypes.PLUS,
  value: optional(value),
});
export const dispatchMinus = value => store.dispatch({
  type: sumActionTypes.MINUS,
  value: optional(value),
});
export const dispatchDiv = value => store.dispatch({
  type: sumActionTypes.DIV,
  value: optional(value),
});
export const dispatchMult = value => store.dispatch({
  type: sumActionTypes.MULT,
  value: optional(value),
});
/** sum dispatcher helpers end */

/** numbers dispatcher helpers start */
import { actionTypes as numbersActionTypes } from './reducers/numbersReducer';

export const dispatchAdd = value => store.dispatch({
  type: numbersActionTypes.ADD,
  value,
});
export const dispatchUpdate = (id, value) => store.dispatch({
  type: numbersActionTypes.UPDATE,
  id,
  value,
});
export const dispatchDelete = id => store.dispatch({
  type: numbersActionTypes.DELETE,
  id,
});
/** numbers dispatcher helpers end */

/*
// test:
store.subscribe(() => {
  const state = store.getState();
  console.log(
    'test compine store subscription',
    JSON.stringify(state, null, 1)
  );
});

// sum:
console.log('plus: 1,3,-1');
[1,3,-2].forEach(value => dispatchPlus(value));
console.log('minus: 5,-17');
[5,-17].forEach(value => dispatchMinus(value));
console.log('mult: 3')
dispatchMult(3);
// // don't do that
// console.log('div: 0')
// dispatchDiv(0);

// numbers:
console.log('add: 0,1,2,1,0');
[0,1,2,1,0].forEach(value => dispatchAdd(value));
console.log('update: (1: 4), (3: 3)');
[{k:1,v:4},{k:3,v:3}].forEach(({k,v}) => dispatchUpdate(k, v));
console.log('delete: 2')
dispatchDelete(2);
*/
