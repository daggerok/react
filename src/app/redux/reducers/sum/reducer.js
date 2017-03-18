import {
  optional,
  isNotValid,
 } from '../common/util';
 import { actionTypes } from './actionTypes';

/** sum reducer */
export const reducer = (state = 0, action) => {

  const sum = optional(state);

  if (isNotValid(action)) {
    return sum;
  }

  const val = optional(action.value);

  switch(action.type) {

    case actionTypes.PLUS:
      return optional(sum + val);

    case actionTypes.MINUS:
      return optional(sum - val);

    case actionTypes.DIV:
      return optional(sum / val);

    case actionTypes.MULT:
      return optional(sum * val);
  }

  return sum;
};

// // use combine sore instead:
// /** sum store */
// import { createStore } from 'redux';
// export const store = createStore(reducer);
