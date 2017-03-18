import { isNotValid } from './util';

/** numbers action types */
export const actionTypes = Object.freeze({
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
});

/** numbers reducer */
export const reducer = (state = [], action) => {

  if (isNotValid(action)) {
    return state;
  }

  switch(action.type) {

    case actionTypes.ADD:
      return reduceAdd(state, action);

    case actionTypes.UPDATE:
      return reduceUpdate(state, action);

    case actionTypes.DELETE:
      return reduceDelete(state, action);
  }

  return state;
};

/** reducer helpers */
const reduceAdd = (state, action) => [
  ...state,
  action.value,
];
const reduceUpdate = (state, action) => {
  const before = state.slice(0, action.id);
  const after = state.slice(action.id + 1, state.length);
  return [
    ...before,
    +action.value,
    ...after,
  ];
};
const reduceDelete = (state, action) => [
  ...state.slice(0, action.id),
  ...state.slice(action.id + 1, state.length),
];

// // use combine sore instead:
/** numbers store */
// import { createStore } from 'redux';
// export const store = createStore(reducer);
