const { join } = require('path');
const pathTo = rel => join(process.cwd(), rel);
const isProd = env => env !== 'development';
const publicPath = env => env === 'ghpages' ? '/react/' : '/';
const devtool = env => isProd(env) ? 'cheap-module-source-map' : 'inline-source-map';

const include = pathTo('./src');
const exclude = /\/(node_modules|bower_components)\//;
const assets = /\.(raw|gif|png|jpg|jpeg|otf|eot|woff|woff2|ttf|svg|ico)$/i;

const cssLoader = env => ({
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
    minimize: isProd(env),
  },
});

const postcssLoader = env => ({
  loader: 'postcss-loader',
  options: {
    sourceMap: !isProd(env),
    plugins: function () {
      return [
        require('precss'),
        require('autoprefixer')([
          'last 4 versions',
        ]),
      ];
    },
  },
});

const use = env => [
  'style-loader',
  cssLoader(env),
  postcssLoader(env),
];

const { version } = require('./package.json');

const {
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  LoaderOptionsPlugin,
  EnvironmentPlugin,
  ProvidePlugin,
  DefinePlugin,
  optimize
} = require('webpack');

const {
  AggressiveSplittingPlugin,
  AggressiveMergingPlugin,
  CommonsChunkPlugin,
  UglifyJsPlugin,
} = optimize;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = env => ({

  context: pathTo('.'),

  entry: {
    polyfills: './src/polyfills.ts',
    vendors: './src/vendors.ts',
    app: './src/main.tsx',
  },

  output: {
    jsonpFunction: 'w',
    path: pathTo('./dist'),
    publicPath: publicPath(env),
    filename: '[name].[id].bundle.js?v=' + version,
    chunkFilename: '[name].[id].chunk.js?v=' + version,
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
        loader: 'file-loader',
        options: {
          name: '[path]/[name].[ext]?v=' + version,
          regExp: /\/src\/(.*)/,
        },
        include,
      },
      {
        test: assets,
        loader: 'file-loader',
        options: {
          name: 'vendors/[1]?v=' + version,
          regExp: /\/node_modules\/(.*)/,
        },
        include: exclude,
      },

    ].filter(rule => !!rule),
  },

  plugins: [

    new ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom',
    }),

    new LoaderOptionsPlugin({
      options: {
        minimize: isProd(env),
        debug: !isProd(env),
      },
    }),

    !isProd(env) ? new HotModuleReplacementPlugin(): undefined,

    isProd(env) ? new UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      comments: false,
      sourceMap: devtool(env) === 'source-map',
    }) : undefined,

    new NoEmitOnErrorsPlugin(),

    new EnvironmentPlugin({
      'NODE_ENV': isProd(env) ? 'production' : 'development',
    }),

    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProd(env) ? env : 'development'),
      },
    }),

    new CommonsChunkPlugin({
      names: ['app', 'vendors', 'polyfills', 'manifest'],
    }),

    new HtmlWebpackPlugin({
      inject: true,
      cache: true,
      showErrors: true,
      excludeChunks: [],
      xhtml: true,
      template: './src/index.html',
      minify: isProd(env) ? {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      } : false,
    }),

    new BaseHrefWebpackPlugin({
      baseHref: publicPath(env),
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),

  ].filter(plugin => !!plugin),

  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.css',
      '.styl',
    ],
  },

  devtool: devtool(env),

  devServer: {
    port: 8000,
    noInfo: false,
    stats: 'minimal',
    host: 'localhost',
    hot: !isProd(env),
    historyApiFallback: true,
    contentBase: pathTo('./dist'),
  },
/*
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
  },

  bail: true,
  profile: 'web',
*/
});
