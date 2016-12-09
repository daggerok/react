import ExtractPlugin from 'extract-text-webpack-plugin';
export const extractCSS = new ExtractPlugin('[name]-[hash].css', { allChunks: true });

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
      loader: 'eslint',
      exclude,
    },
    {
      include,
      exclude,
      test: /\.js$/i,
      loader: 'source-map',
    }
  ],

  loaders: [
    {
      test: images,
      exclude: [exclude, resources],
      include: [resolvePath('./src/api/v1/photos')],
      loaders: [
        'file?name=[path]/[name].[ext]',
        'image-webpack?{optimizationLevel:7,interlaced:false,mozjpeg:{quality:0,progressive:true}}'
      ]
    },
    {
      include,
      exclude,
      test: /\.json$/i,
      loader: 'json',
    },
    {
      include,
      exclude,
      test: /\.js$/i,
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
      include: [
        resolvePath('./node_modules/angular'),
        resolvePath('./node_modules/bootstrap/dist'),
        include,
      ],
      test: /\.css$/i,
      loader: extractCSS.extract('style', 'css?importloader=1&sourceMap', 'postcss'),
    },
    {
      exclude,
      include,
      test: /\.styl$/i,
      loader: extractCSS.extract('style', 'css!postcss!stylus?sourceMap'),
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
    }
  ],
};
