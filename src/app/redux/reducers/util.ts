/** DRY code */
export const isNotValid = action => !action || !action.type;
export const optional = value => +value || 0;
