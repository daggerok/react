import webpack from 'webpack';
import config from './common/config.babel';

config.devtool = false;
// config.devtool = 'source-map';

config.plugins = [
  ...config.plugins,
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true
    },
    compress: {
      warnings: false,
      screw_ie8: true
    },
    comments: false
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
];

export default config;
