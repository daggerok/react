import types from '../types';

export default (payload = 1) => ({
  type: types.INCREMENT,
  payload,
});
