import { actionTypes } from './actionTypes';
import { optional } from '../common/util';

export const add = value => ({
  type: actionTypes.ADD,
  value: optional(value),
});

export const update = (id, value) => ({
  type: actionTypes.UPDATE,
  id: optional(id),
  value: optional(value),
});

export const remove = id => ({
  type: actionTypes.DELETE,
  id: optional(id),
});
