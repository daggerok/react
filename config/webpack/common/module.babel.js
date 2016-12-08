import ExtractPlugin from 'extract-text-webpack-plugin';
export const extractCSS = new ExtractPlugin('[name]-[hash].css', { allChunks: true });

import path from 'path';
const resolvePath = (rel) => path.resolve(process.cwd(), rel);

const resources = resolvePath('./src/resources');
const include = resolvePath('./src');

const vendors = /\/node_modules\//;
const assets = /\.(raw|gif|png|otf|eot|woff|woff2|ttf|svg|ico)$/i;
const images = /\.jpe?g$/i;

export default {
  preLoaders: [
    {
      include,
      test: /\.js$/i,
      loader: 'eslint',
      exclude: vendors,
    },
    {
      include,
      test: /\.js$/i,
      exclude: vendors,
      loader: 'source-map',
    }
  ],

  loaders: [
    {
      include: [resolvePath('./src/api/v1/photos')],
      exclude: [vendors, resources],
      test: images,
      loaders: [
        'file?name=[path]/[name].[ext]',
        'image-webpack?{optimizationLevel:7,interlaced:false,mozjpeg:{quality:0,progressive:true}}'
      ]
    },
    {
      include,
      test: /\.json$/i,
      loader: 'json',
    },
    {
      include,
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
      test: /\.css$/i,
      include: [
        resolvePath('./node_modules/angular'),
        resolvePath('./node_modules/bootstrap/dist'),
        include,
      ],
      loader: extractCSS.extract('style', 'css?importloader=1&sourceMap', 'postcss'),
    },
    {
      include,
      test: /\.styl$/i,
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
    }
  ]
};
