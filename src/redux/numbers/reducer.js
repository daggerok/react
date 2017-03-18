import { actionTypes } from './actionTypes';

export const reducer = (state = [], action) => {

  if (!action) {
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
const reduceAdd = (state, { value }) => [
  ...state,
  value,
];

const reduceUpdate = (state, { id, value }) => {
  const before = state.slice(0, id);
  const after = state.slice(id + 1, state.length);
  return [
    ...before,
    +value,
    ...after,
  ];
};

const reduceDelete = (state, { id }) => [
  ...state.slice(0, id),
  ...state.slice(id + 1, state.length),
];

// // use combine sore instead:
/** numbers store */
// import { createStore } from 'redux';
// export const store = createStore(reducer);
