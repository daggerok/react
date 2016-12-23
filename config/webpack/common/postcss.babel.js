import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const AUTOPREFIXER_BROWSERS = [
  'last 4 versions',
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 28',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

export default [
  autoprefixer(AUTOPREFIXER_BROWSERS),
  cssnano,
];
