import types from '../actions/types';

export default (state = 0, action) => {
  if (!action || !action.type) return state;
  const payload = +action.payload;
  switch(action.type) {
    case types.INCREMENT:
      return state + payload;
    case types.DECREMENT:
      return state - payload;
    default:
      return state;
  }
};
