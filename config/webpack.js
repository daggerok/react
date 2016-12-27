const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = (process.env || {});
const isProduction = env.NODE_ENV === 'production';

module.exports = {

  entry: {
    app: './src/main.tsx',
  },

  output: {
    path: './dist',
    publicPath: '/react/',
    filename: '[name]-[chunkhash].bundle.js',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.ts', '.tsx', '.js'],
  },

  module: {
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/i, loader: 'source-map-loader' },
    ],
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      // { test: /\.tsx?$/i, loader: 'awesome-typescript-loader' },
      { test: /\.tsx?$/i, loader: 'ts-loader' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'react-typescript',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        quoteCharacter: '"',
        decodeEntities: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      },
    }),
  ],

  devServer: {
    contentBase: './src',
    watchDelay: 100,
    progress: true,
    inline: true,
    port: 8000,
    historyApiFallback: {
      index: '/react/',
    },
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },

  // // When importing a module whose path matches one of the following, just
  // // assume a corresponding global variable exists and use that instead.
  // // This is important because it allows us to avoid bundling all of our
  // // dependencies, which allows browsers to cache those libraries between builds.
  // ,externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  // },
};
