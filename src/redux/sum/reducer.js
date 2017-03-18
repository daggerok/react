import { optional } from '../common/util';
import { actionTypes } from './actionTypes';

export const reducer = (state = 0, action) => {

  const current = optional(state);

  if (!action) {
    return current;
  }

  const payload = optional(action.value);

  switch(action.type) {

    case actionTypes.PLUS:
      return optional(current + payload);

    case actionTypes.MINUS:
      return optional(current - payload);

    case actionTypes.DIV:
      return optional(current / payload);

    case actionTypes.MULT:
      return optional(current * payload);
  }

  return current;
};

// // use combine sore instead:
// /** sum store */
// import { createStore } from 'redux';
// export const store = createStore(reducer);
