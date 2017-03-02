import { DefinePlugin, optimize } from 'webpack';
import config from './common/config.babel';

config.devtool = false;

config.plugins = [
  ...config.plugins,
  new optimize.DedupePlugin(),
  new optimize.UglifyJsPlugin({
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
  new DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
  new optimize.AggressiveMergingPlugin(),
];

export default config;
