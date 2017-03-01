export const profile = ((process || {}).env || {}).NODE_ENV || '';
export const isProd = profile !== 'development';
export const isGhpages = profile !== 'ghpages';
