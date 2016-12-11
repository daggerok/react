import config from './common/config.babel';
import devServer from './common/webpack-dev-server.babel';

export default {
  ...config,
  devServer,
  devtool: 'eval-cheap-module-source-map',
};