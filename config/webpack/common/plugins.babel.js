import {
  NoErrorsPlugin,
  ProvidePlugin,
  optimize, }                     from 'webpack';
import HtmlWebpackPlugin          from 'html-webpack-plugin';
import CopyWebpackPlugin          from 'copy-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

import { extractCSS } from './module.babel';

const { OccurenceOrderPlugin, CommonsChunkPlugin, } = optimize;

export default [
  extractCSS,
  new OccurenceOrderPlugin(true),
  new CommonsChunkPlugin({
    name: 'vendors',
    filename: 'vendors-[hash].js',
    minChunks: Infinity,
  }),
  new NoErrorsPlugin(),
  new HtmlWebpackPlugin({
    // // spa fallback (prod, ie github pages only): ¯\_(ツ)_/¯,
    favicon: './src/assets/favicon.ico',
    template: './src/assets/index.html',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    },
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
  }),/*
  new CopyWebpackPlugin([
    { from: './src/api', to: 'api' },
  ]),*/
  new ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
  }),
];
