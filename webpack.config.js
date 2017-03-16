const { join } = require('path');
const pathTo = rel => join(process.cwd(), rel);
const isProd = env => env !== 'development';
const minimize = env => isProd(env) ? '&minimize' : '';
const publicPath = env => env === 'ghpages' ? '/react/' : '/';

const include = pathTo('./src');
const exclude = /\/(node_modules|bower_components)\//;
const assets = /\.(raw|gif|png|jpg|jpeg|otf|eot|woff|woff2|ttf|svg|ico)$/i;

const cssLoader = env => ({
  loader: 'css-loader',
  options: {
    camelCase: true,
    importLoaders: 1,
    sourceMap: !isProd(env),
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

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
    filename: `[name].[id].bundle.js?v=${version}`,
    publicPath: publicPath(env),
    chunkFilename: `'[name].[id].chunk.js?v=${version}`,
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
          ...use(env),
          'stylus-loader',
        ],
        include,
      },
      {
        test: assets,
        // loader: 'file-loader?name=[path]/[name].[ext]&regExp=src/(.*)',
        loader: 'file-loader',
        options: {
          name: `[path]/[name].[ext]?v=${version}`,
          regExp: /\/src\/(.*)/,
        },
        include,
      },
      {
        test: assets,
        // loader: 'file-loader?name=vendors/[1]&regExp=node_modules/(.*)',
        loader: 'file-loader',
        options: {
          name: `vendors/[1]?v=${version}`,
          regExp: /\/node_modules\/(.*)/,
        },
        include: exclude,
      },
    ].filter(rule => !!rule),
  },

  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.css',
      '.styl',
    ],
    modules: [
      include,
      'node_modules',
    ],
  },

  plugins: [

    new ProvidePlugin({
      // 'jQuery': 'jquery', // bootstrap/dist/js/bootstrap.js required jQuery from jquery
      'React': 'react',
      'ReactDOM': 'react-dom',
    }),

    new LoaderOptionsPlugin({
      options: {
        postcss: postcssLoader(env),
        minimize: isProd(env),
        debug: !isProd(env),
      },
    }),

    !isProd(env) ? new HotModuleReplacementPlugin(): undefined,

    isProd(env) ? new UglifyJsPlugin({
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

    new NoEmitOnErrorsPlugin(),

    new EnvironmentPlugin({ // use DefinePlugin instead
      'NODE_ENV': env !== 'development' ? 'production' : 'development',
    }),

    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env !== 'development' ? env : 'development'),
      },
    }),

    new CommonsChunkPlugin({ name: 'manifest' }),
    new CommonsChunkPlugin({ name: 'vendors', chunks: ['app', 'vendors'], }),
/*
    !isProd(env) ? undefined : new AggressiveMergingPlugin(),
    new AggressiveSplittingPlugin({
      minSize: 30000,
      maxSize: 50000,
    }),
*/
    new HtmlWebpackPlugin({
      inject: true,
      cache: true,
      showErrors: true,
      excludeChunks: [],
      xhtml: true,
      // chunks: [
      //   'vendors',
      //   'app',
      // ],
      // // chunksSortMode: 'dependency',
      template: './src/index.html',
      minify: env !== 'development' ? {
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

    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),

  ].filter(plugin => !!plugin),

  devtool: 'source-map',

  devServer: {
    port: 8000,
    hot: !isProd(env),
    stats: 'minimal',
    contentBase: './src',
    historyApiFallback: true,
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

  bail: true,
  profile: 'web',
});
