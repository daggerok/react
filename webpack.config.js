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
  AggressiveMergingPlugin,
  CommonsChunkPlugin,
  UglifyJsPlugin,
} = optimize;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const babel = {
  presets: [
    [ 'es2015', { modules: false } ],
    'stage-0',
    'react',
  ],
  plugins: [
    'react-html-attrs',
    'add-module-exports',
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-decorators-legacy',
  ],
};

const { resolve } = require('path');
const pathTo = rel => resolve(process.cwd(), rel);
const include = pathTo('./src');

const styleIncludes = [
  include,
  pathTo('./node_modules/normalize.css/'),
  pathTo('./node_modules/bootstrap/dist/'),
  pathTo('./node_modules/bootswatch/'),
];
const styleConfig = {
  publicPath: '/',
  fallback: 'style-loader',
  use: `css-loader?importLoader=1&minimize!postcss-loader?sourceMap=inline`,
};
const styleLoader = id => ExtractTextWebpackPlugin.extract(
  Object.assign({}, styleConfig, { use: id === 'css' ? styleConfig.use : `${styleConfig.use}!${id}-loader` }));

const assets = /\.(raw|gif|png|jpe?g|otf|eot|woff2?|ttf|svg|ico)$/i;
const exclude = /\/node_modules\//i;

const precss = require('precss');
const rucksackCss = require('rucksack-css');

const { version } = require('./package.json');
const filename = ext => `[name].${ext}?v=${version}`;

module.exports = env => ({
  entry: {
    vendors: './src/vendors.js',
    app: './src/main.js',
  },

  output: {
    path: pathTo('./dist'),
    filename: filename('js'),
    chunkFilename: `[id].chunk.js?v=${version}`,
    jsonpFunction: 'w',
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        include,
        loader: 'babel-loader',
        options: babel,
      },
      {
        test: /\.css$/i,
        /*
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
        */
        include: styleIncludes,
        use: styleLoader('css'),
      },
      {
        test: /\.less$/i,
        include: styleIncludes,
        use: styleLoader('less'),
      },
      {
        test: /\.(sass|scss)$/i,
        include: styleIncludes,
        use: styleLoader('sass'),
      },
      {
        test: /\.styl/i,
        include: styleIncludes,
        use: styleLoader('stylus'),
      },
      {
        test: assets,
        include: exclude,
        use: 'file-loader?name=vendors/[1]&regExp=node_modules/(.*)',
      },
      {
        test: assets,
        exclude,
        use: 'file-loader?name=[path]/[name].[ext]',
      },
    ].filter(r => !!r),
  },

  resolve: {
    extensions: [
      '.js',
      '.css',
      '.less',
      '.scss',
      '.sass',
      '.styl',
    ],
    modules: [
      pathTo('./src'),
      'node_modules',
    ],
  },

  plugins: [
    new ProvidePlugin({
      'jQuery': 'jquery' // bootstrap/dist/js/bootstrap.js required jQuery from jquery
    }),
    new LoaderOptionsPlugin({
      options: {
        content: pathTo('.'),
        babel,
        postcss: [
          precss,
          rucksackCss({
            fallbacks: true,
            autoprefixer: {
              browsers: ['last 4 versions'],
            },
          }),
        ],
        minimize: env === 'production',
        debug: env !== 'production',
      },
    }),
    env !== 'production' ? new HotModuleReplacementPlugin(): undefined,
    env === 'production' ? new UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }) : undefined,
    env === 'production' ? new NoEmitOnErrorsPlugin() : undefined,
    new ExtractTextWebpackPlugin({
      disable: false,
      allChunks: true,
      publicPath: '/',
      filename: filename('css'),
    }),
    new EnvironmentPlugin({ // use DefinePlugin instead
      'NODE_ENV': env === 'production' ? env : 'development',
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env === 'production' ? env : 'development'),
      },
    }),
    new CommonsChunkPlugin('vendors'),
    env === 'production' ? new AggressiveMergingPlugin() : undefined,
    new HtmlWebpackPlugin({
      chunks: [
        'vendors',
        'app',
      ],
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
    compress: env === 'production',
    inline: env !== 'production',
    hot: env !== 'production',
    // stats: 'minimal',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      }
    },
    contentBase: pathTo('./src'),
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrign: false,
        secure: false,
      },
    },
  },

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
});
