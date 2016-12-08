import webpack from 'webpack';
import config from './common/config.babel';

config.devtool = false;
// config.devtool = 'source-map';

config.plugins = [
  ...config.plugins,
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      keep_fnames: true,
    },
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
];

export default config;
