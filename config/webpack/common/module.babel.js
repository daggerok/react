import ExtractPlugin from 'extract-text-webpack-plugin';
export const extractCSS = new ExtractPlugin('[name]-[hash].css', { allChunks: true });

import { resolve } from 'path';
const pathTo = (rel) => resolve(process.cwd(), rel);

const resources = pathTo('./src/resources');
const include = pathTo('./src');

const exclude = /\/node_modules\//;
const assets = /\.(raw|gif|png|otf|eot|woff|woff2|ttf|svg|ico)$/i;
const images = /\.jpe?g$/i;

export default {
  preLoaders: [
    {
      include,
      test: /\.js$/i,
      loader: 'eslint-loader',
      exclude,
    },
    {
      include,
      exclude,
      test: /\.js$/i,
      loader: 'source-map-loader',
    },
  ],

  loaders: [
    {
      test: images,
      exclude: [
        exclude,
        resources,
      ],
      include: pathTo('./src/api/v1/photos'),
      loaders: [
        'file-loader?name=[path]/[name].[ext]',
        'image-webpack-loader?{optimizationLevel:7,interlaced:false,mozjpeg:{quality:0,progressive:true}}',
      ],
    },
    {
      include,
      exclude,
      test: /\.json$/i,
      loader: 'json-loader',
    },
    {
      include,
      exclude,
      test: /\.js$/i,
      loader: 'babel-loader',
      query: {
        presets: [
          'stage-0',
          'es2015',
          'react',
        ],
        plugins: [
          'react-html-attrs',
          'add-module-exports',
          'transform-class-properties',
        ],
      },
    },
    {
      include: [
        pathTo('./node_modules/toastr'),
        pathTo('./node_modules/purecss'),
        include,
      ],
      test: /\.css$/i,
      loader: extractCSS.extract('style-loader', 'css-loader?importLoader=1&sourceMap', 'postcss-loader'),
    },
    {
      exclude,
      include,
      test: /\.styl$/i,
      loader: extractCSS.extract('style-loader', 'css-loader!postcss-loader!stylus-loader?sourceMap'),
    },
    {
      include: exclude,
      loader: 'file-loader?name=vendors/[1]&regExp=node_modules/(.*)',
      test: assets,
    },
    {
      exclude,
      include: resources,
      loader: 'file-loader?name=resources/[1]&regExp=src/resources/(.*)',
      test: assets,
    },
    {
      exclude: [
        exclude,
        resources,
      ],
      loader: 'file-loader?name=[path]/[name].[ext]',
      test: assets,
    },
  ],
};
