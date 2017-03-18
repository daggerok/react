import { actionTypes } from './actionTypes';
import { optional } from '../common/util';

export const plus = value => ({
  type: actionTypes.PLUS,
  value: optional(value),
});

export const minus = value => ({
  type: actionTypes.MINUS,
  value: optional(value),
});

export const div = value => ({
  type: actionTypes.DIV,
  value: optional(value),
});

export const mult = value => ({
  type: actionTypes.MULT,
  value: optional(value),
});
