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
    vendors: './src/vendors.ts',
    app: './src/main.tsx',
  },

  output: {
    jsonpFunction: 'w',
    path: pathTo('./dist'),
    filename: '[name].[id].js?v=' + version,
  },

  devtool: '#source-map',

  resolve: {
    extensions: ['', '.ts', '.tsx', '.js'],
  },

  module: {
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/i, loader: 'source-map-loader' },
    ],
    loaders: [
      { test: /\.tsx?$/i, loader: 'ts-loader' },
      // { test: /\.css$/i, loader: 'style-loader!css-loader?importLoaders=1!postcss-loader' },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ],
      },
    ],
  },

  postcss: () => [
    require('precss'),
    require('autoprefixer')([
      'last 4 versions',
    ]),
  ],

  plugins: [

    new NoErrorsPlugin(),

    isProduction ? undefined : new HotModuleReplacementPlugin(),
    !isProduction ? undefined : new optimize.AggressiveMergingPlugin(),
    !isProduction ? undefined : new optimize.DedupePlugin(),

    !isProduction ? undefined : new optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        keep_fnames: true,
      },
    }),

    /* ordered chunks start */
    new optimize.OccurenceOrderPlugin(true),
    new optimize.OccurrenceOrderPlugin(true),

    new optimize.CommonsChunkPlugin({
      names: ['vendors', 'manifest'],
    }),

    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
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
    /* ordered chunks end */

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
    // historyApiFallback: { index: '/react/', },
    historyApiFallback: true,
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
