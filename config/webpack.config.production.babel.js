/**
 * Created by mak on 9/6/16.
 */
import config from './webpack.config.babel';
import webpack from 'webpack';

config.devtool = '#source-map';

config.plugins = [
  ...config.plugins,

  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
];

config.externals = {
  // Use external (CDN) versions
  "react": "React",
  "react-dom": "ReactDOM"
};

export default config;
