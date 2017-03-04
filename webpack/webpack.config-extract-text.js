const { resolve } = require('path');
const {
  NoEmitOnErrorsPlugin,
  LoaderOptionsPlugin,
  DefinePlugin,
  optimize
} = require('webpack');
const {
  AggressiveMergingPlugin,
  OccurrenceOrderPlugin,
  CommonsChunkPlugin,
} = optimize;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const rucksackCss = require('rucksack-css');

const cssLoader = env => ExtractTextWebpackPlugin.extract({
  publicPath: '/',
  fallback: 'style-loader',
  use: `css-loader?importLoader=1${env === 'production' ? '&minimize' : ''}!postcss-loader?sourceMap=inline`,
});

const pathTo = rel => resolve(process.cwd(), rel);

const assets = /\.(raw|gif|png|jpe?g|otf|eot|woff2?|ttf|svg|ico)$/i;
const exclude = /\/node_modules\//i;
const include = pathTo('./src');

module.exports = env => ({
  entry: './src/main.js',
  output: {
    path: pathTo('./dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?x$/i,
        exclude: [
          exclude,
          include,
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            [ 'es2015', { modules: false } ],
            'stage-0',
            'react',
          ],
          plugins: [
            'add-module-exports',
            'syntax-dynamic-import',
            'transform-decorators-legacy',
          ],
        },
      },
      {
        test: /\.css$/i,
        include: [
          include,
          pathTo('./node_modules/normalize.css/'),
          pathTo('./node_modules/bootstrap/dist/'),
          pathTo('./node_modules/bootswatch/'),
        ],
        use: cssLoader(env),
      },
      {
        test: assets,
        include: exclude,
        loader: 'file-loader?name=vendors/[1]&regExp=node_modules/(.*)',
      },
      {
        test: assets,
        exclude,
        loader: 'file-loader?name=[path]/[name].[ext]',
      },
    ].filter(r => !!r),
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.css',
    ],
    modules: [
      pathTo('./src'),
      'node_modules',
    ],
  },
  plugins: [
    new LoaderOptionsPlugin({
      options: {
        // content: pathTo('.'),
        postcss: [
          precss,
          rucksackCss({
            fallbacks: true,
            autoprefixer: {
              browsers: [ 'last 4 versions' ],
            },
          }),
        ],
      },
    }),
    env === 'production' ? new NoEmitOnErrorsPlugin() : undefined,
    env === 'production' ? new OccurrenceOrderPlugin() : undefined,
    new ExtractTextWebpackPlugin({
      disable: false,
      allChunks: true,
      publicPath: '/',
      filename: '[name].css',
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env === 'production' ? env : 'development'),
      },
    }),
    new CommonsChunkPlugin({
      children: true,
      async: true,
    }),
    env === 'production' ? new AggressiveMergingPlugin() : undefined,
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: env === 'production' ? {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true,
        } : false,
    }),
  ].filter(p => !!p),
  devtool: 'source-map',
  devServer: {
    port: 8000,
    inline: true,
    contentBase: pathTo('./src'),
  },
});
