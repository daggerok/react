import { version } from '../../../package.json';

export const publicPath = '/react/';

export default {
  publicPath,
  path: './dist',
  filename: `[name]-[hash].js?v=${version}`,
  sourceMapFilename: `[file].map?v=${version}`,
};
