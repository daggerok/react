import config from './webpack.config.babel';
import webpack from 'webpack';
const { DefinePlugin, optimize } = webpack;

config.devtool = '#source-map';

config.plugins = [
  ...config.plugins,

  new DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    },
  }),
  new optimize.OccurenceOrderPlugin(true),
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
  new optimize.AggressiveMergingPlugin(),
];

config.externals = {
  // Use external (CDN) versions
  "react": "React",
  "react-dom": "ReactDOM"
};

export default config;
