import path from 'path';
import webpack from 'webpack';
import ExtractPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const extractCSS = new ExtractPlugin('[name]-[hash].css', { allChunks: true });

const resolve = (rel) => path.resolve(process.cwd(), rel);

const vendors = /\/node_modules\//;
const assets = /\.(raw|gif|png|jpg|jpeg|otf|eot|woff|woff2|ttf|svg|ico)$/;

const resources = resolve('./src/resources');
const include = resolve('./src');

export default {
  entry: {
    'app': [
      './src/vendors.js',
      './src/main.js'
    ],
  },

  output: {
    path: './dist',
    filename: '[name]-[hash].js',
    publicPath: '/react/',
  },

  module: {
    preLoaders: [{
      exclude: vendors,
      include,
      test: /\.js$/,
      loader: 'source-map',
    }],

    loaders: [
      {
        include,
        test: /\.json$/,
        loader: 'json',
      },
      {
        include,
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: [
            'stage-0',
            'es2015',
            'react'
          ],
          plugins: [
            'react-html-attrs',
            'add-module-exports',
            'transform-class-properties'
          ]
        }
      },
      {
        test: /\.css$/,
        include: [
          resolve('./node_modules/angular'),
          resolve('./node_modules/bootstrap/dist'),
          include,
        ],
        loader: extractCSS.extract('style', 'css?importloader=1&sourceMap', 'postcss'),
      },
      {
        include,
        test: /\.styl$/,
        loader: extractCSS.extract('style', 'css!postcss!stylus?sourceMap'),
      },
      {
        include: vendors,
        loader: 'file?name=vendors/[1]&regExp=node_modules/(.*)',
        test: assets,
      },
      {
        include: resources,
        loader: 'file?name=resources/[1]&regExp=src/resources/(.*)',
        test: assets,
      },
      {
        exclude: [vendors, resources],
        loader: 'file?name=[path]/[name].[ext]',
        test: assets,
      },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules']
  },

  plugins: [
    new webpack.NoErrorsPlugin(),

    extractCSS,

    new HtmlWebpackPlugin({
      // // spa fallback (prod, ie github pages only):
      // filename: `404.html`,
      favicon: './src/assets/favicon.ico',
      template: './src/assets/index.html',
      minify: { collapseWhitespace: true }
    }),

    new CopyWebpackPlugin([
      { from: './src/api', to: 'api' }
    ]),

    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
  ],

  postcss: () => [
    autoprefixer,
    cssnano
  ],

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
};
