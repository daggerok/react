const {
  optimize,
  DefinePlugin,
  NoErrorsPlugin,
  HotModuleReplacementPlugin,
} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = (process.env || {});
const isProduction = env.NODE_ENV === 'production';

const { version } = require('../package.json');

const { resolve } = require('path');
const pathTo = rel => resolve(process.cwd(), rel);

module.exports = {

  entry: {
    vendors: './src/main.tsx',
    app: './src/main.tsx',
  },

  output: {
    jsonpFunction: 'w',
    publicPath: '/react/',
    path: pathTo('./dist'),
    filename: '[name].[id].js?v=' + version,
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: '#source-map',

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
      { test: /\.tsx?$/i, loader: 'ts-loader' },
    ],
  },

  plugins: [
    isProduction ? undefined : new HotModuleReplacementPlugin(),

    !isProduction ? undefined : new optimize.AggressiveMergingPlugin(),
    !isProduction ? undefined : new optimize.OccurrenceOrderPlugin(),
    !isProduction ? undefined : new optimize.OccurenceOrderPlugin(),
    !isProduction ? undefined : new optimize.DedupePlugin(),

    !isProduction ? undefined : new optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        keep_fnames: true,
      },
    }),

    new optimize.CommonsChunkPlugin({ name: 'manifest', }),
    new optimize.CommonsChunkPlugin({
      name: 'vendors',
      chunks: [
        'app',
        'vendors',
      ],
    }),

    new NoErrorsPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: isProduction ? {
        minifyJS: true,
        minifyCSS: true,
        quoteCharacter: '"',
        decodeEntities: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
      } : false,
    }),

    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      },
    }),
  ].filter(plugin => !!plugin),

  devServer: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
    historyApiFallback: {
      index: '/react/',
    },
    contentBase: pathTo('./src'),
    watchDelay: 100,
    progress: true,
    inline: true,
    port: 8000,
    hot: true,
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
