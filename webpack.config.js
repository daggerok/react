const { join } = require('path');
const pathTo = rel => join(process.cwd(), rel);
const isProd = env => env !== 'development';

const include = pathTo('./src');
const { version } = require('./package.json');
const exclude = /\/(node_modules|bower_components)\//;
const assets = /\.(raw|gif|png|jpg|jpeg|ico|png|woff2?|eot|ttf|otf|svg)$/i;

const use = env => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      minimize: isProd(env),
      sourceMap: !isProd(env),
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: function () {
        return [
          require('precss'),
          require('autoprefixer')([
            'last 4 versions',
          ]),
        ];
      }
    }
  },
];

module.exports = env => ({

  context: pathTo('.'),

  entry: {
    app: './src/main.tsx',
  },

  output: {
    path: pathTo('./dist'),
    publicPath: '/dist/',
    filename: '[name].js?v=' + version,
  },

  module: {
    rules: [
      {
        test: /\.ts?x$/i,
        loader: 'ts-loader',
        include,
      },

      {
        test: /\.css$/i,
        use: use(env),
      },
      {
        test: /\.styl$/i,
        use: [
          ...use(env),
          'stylus-loader',
        ],
        include,
      },

      {
        test: assets,
        loader: 'url-loader',
        options: {
          limit: 100,
          name: '[path]/[name].[ext]?v=' + version,
          regExp: /src\/(.*)/,
        },
        include,
      },

      {
        test: assets,
        loader: 'url-loader',
        options: {
          limit: 100,
          name: 'vendors/[1]?v=' + version,
          regExp: /node_modules\/(.*)/,
        },
        include: exclude,
      },

    ].filter(r => !!r),
  },

  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
    ],
  },

});
