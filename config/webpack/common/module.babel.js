import ExtractPlugin from 'extract-text-webpack-plugin';
import { version } from '../../../package.json';

export const extractCSS = new ExtractPlugin(
  `[name]-[hash].css?v=${version}`,
  { allChunks: true, }
);

import path from 'path';
const resolvePath = (rel) => path.resolve(process.cwd(), rel);

const resources = resolvePath('./src/resources');
const include = resolvePath('./src');

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
      exclude: [exclude, resources],
      include: [resolvePath('./src/api/v1/photos')],
      loaders: [
        'file?name=[path]/[name].[ext]',
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
        resolvePath('./node_modules/angular'),
        resolvePath('./node_modules/bootstrap/dist'),
        include,
      ],
      test: /\.css$/i,
      loader: extractCSS.extract('style-loader', 'css-loader?importloader=1&sourceMap', 'postcss-loader'),
    },
    {
      exclude,
      include,
      test: /\.styl$/i,
      loader: extractCSS.extract('style-loader', 'css-loader!postcss-loader!stylus-loader?sourceMap'),
    },
    {
      include: exclude,
      loader: 'file?name=vendors/[1]&regExp=node_modules/(.*)',
      test: assets,
    },
    {
      exclude,
      include: resources,
      loader: 'file?name=resources/[1]&regExp=src/resources/(.*)',
      test: assets,
    },
    {
      exclude: [exclude, resources],
      loader: 'file?name=[path]/[name].[ext]',
      test: assets,
    },
  ],
};
