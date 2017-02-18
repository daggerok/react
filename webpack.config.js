const { version } = require('./package.json');
const { resolve } = require('path');

const pathTo = rel => resolve(process.cwd(), rel);
const minimize = env => env !== 'development' ? '&minimize' : '';

const include = pathTo('./src');
const exclude = /\/(node_modules|bower_components)\//;
const assets = /\.(raw|gif|png|jpg|jpeg|otf|eot|woff|woff2|ttf|svg|ico)$/i;

const postcss = {
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
};

module.exports = env => ({
  entry: {
    app: './src/main.tsx',
  },
  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: `[name].js?${version}`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        loader: 'ts-loader',
        include,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          postcss,
        ],
        /*
        include: [
          pathTo('./node_modules/semantic-ui-css'),
          pathTo('./node_modules/normalize.css'),
          pathTo('./node_modules/bootswatch'),
          pathTo('./node_modules/bootstrap'),
          include,
        ],
        */
      },
      {
        test: /\.styl$/i,
        use: [
          'style-loader',
          'css-loader?importLoaders=2',
          postcss,
          'stylus-loader',
        ],
        include,
      },
      {
        test: assets,
        loader: 'file-loader?name=[path]/[name].[ext]&regExp=src/(.*)',
        include,
        exclude,
      },
      {
        test: assets,
        loader: 'file-loader?name=vendors/[1]&regExp=node_modules/(.*)',
        include: exclude,
        exclude: include,
      },
    ].filter(r => !!r),
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
    ],
    modules: [
      include,
      'node_modules',
    ],
  },
});
