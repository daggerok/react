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
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const CompressionWebpackPlugin = require('compression-webpack-plugin');

const babel = {
  presets: [
    [ 'env', {
      'targets': {
        'browsers': [
          'last 4 versions',
          'ie >= 7'
        ],
        'node': [
          6,
          7,
          'current'
        ]
      }
    } ],
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

const isProd = env => env !== 'development';
const minimize = env => isProd(env) ? '&minimize' : '';
const publicPath = env => env === 'ghpages' ? '/react/' : '/';

const use = env => [
  // `css-loader?{"module":true,"importLoaders":1,"minimize":${isProd(env)},"sourceMap":${!isProd(env)}`,
  // `postcss-loader${isProd(env) ? '' : '?{"sourceMap":"inline"}'}`,
  {
    loader: 'css-loader',
    options: {
      module: true,
      importLoaders: 1,
      minimize: isProd(env),
      sourceMap: !isProd(env),
    },
  },
  {
    loader: 'postcss-loader',
    options: !isProd(env) ? {
      sourceMap: 'inline',
    } : {},
  },
];

const loaders = env => [
  'exports-loader?module.exports.toString()',
  ...use(env),
];

const include = pathTo('./src');

const styleIncludes = [
  include,
  pathTo('./node_modules/normalize.css/'),
  pathTo('./node_modules/bootstrap/dist/'),
  pathTo('./node_modules/bootswatch/'),
];

const includesLoader = (env, id) => ExtractTextWebpackPlugin.extract({
  use: id === 'css' ? use(env) : [
    ...use(env),
    `${id}-loader`,
  ],
  fallback: 'style-loader',
  publicPath: publicPath(env),
});

const exclude = /\/node_modules\//i;
const fonts = /\.(otf|eot|woff2?|ttf)$/i;
const images = /\.(raw|gif|png|jpe?g|svg|ico)$/i;

const precss = require('precss');
const rucksackCss = require('rucksack-css');

const { version } = require('../package.json');
const filename = ext => `[name].${ext}?v=${version}`;

const vendorsFileLoader = {
  loader: 'file-loader',
  options: {
    name: `vendors/[1]?v=${version}`,
    regExp: /\/node_modules\/(.*)/,
  },
};

const assetsFileLoader = {
  loader: 'file-loader',
  options: {
    name: `[path]/[name].[hash].[ext]?v=${version}`,
    hash: 'sha512',
    digest: 'hex',
  },
};

const imageWebpackLoader = {
  loader: 'image-webpack-loader',
  options: {
    bypassOnDebug: true,
    optimizationLevel: 7,
    interlaced: false,
  },
};

const proxy = () => ({
  target: 'http://localhost:8080',
  changeOrign: false,
  secure: false,
});

module.exports = env => ({

  entry: {
    polyfills: './src/polyfills.js',
    vendors: './src/vendors.js',
    app: './src/main.js',
  },

  output: {
    jsonpFunction: 'w',
    path: pathTo('./dist'),
    filename: filename('js'),
    publicPath: publicPath(env),
    chunkFilename: `[id].chunk.js?v=${version}`,
  },

  module: {
    rules: [
      {
        test: /\.hbs$/i,
        include,
        loader: 'handlebars-loader'
      },
      {
        test: /\.jsx?$/i,
        include,
        loader: 'babel-loader',
        options: babel,
      },
      {
        test: /\.css$/i,
        exclude: styleIncludes,
        loaders: loaders(env),
      },
      {
        test: /\.less$/i,
        exclude: styleIncludes,
        loaders: [
          ...loaders(env),
          'less-loader',
        ],
      },
      {
        test: /\.(scss|sass)$/i,
        exclude: styleIncludes,
        loaders: [
          ...loaders(env),
          'sass-loader',
        ],
      },
      {
        test: /\.styl$/i,
        exclude: styleIncludes,
        loaders: [
          ...loaders(env),
          'stylus-loader',
        ],
      },
      {
        test: /\.css$/i,
        include: styleIncludes,
        use: includesLoader(env, 'css'),
      },
      {
        test: /\.less$/i,
        include: styleIncludes,
        use: includesLoader(env, 'less'),
      },
      {
        test: /\.s(a|c)ss$/i,
        include: styleIncludes,
        use: includesLoader(env, 'sass'),
      },
      {
        test: /\.styl$/i,
        include: styleIncludes,
        use: includesLoader(env, 'stylus'),
      },
      {
        test: fonts,
        include: exclude,
        use: vendorsFileLoader,
      },
      {
        test: fonts,
        exclude,
        // use: `file-loader?hash=sha512&digest=hex&name=[path]/[name].[hash].[ext]?v=${version}`,
        use: assetsFileLoader,
      },
      {
        test: images,
        include: exclude,
        loaders: [
          // `file-loader?name=vendors/[1]?v=${version}&regExp=node_modules/(.*)`,
          // 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
          vendorsFileLoader,
          imageWebpackLoader,
        ],
      },
      {
        test: images,
        include,
        loaders: [
          assetsFileLoader,
          imageWebpackLoader,
        ],
      },
    ].filter(rule => !!rule),
  },

  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.css',
      '.less',
      '.scss',
      '.sass',
      '.styl',
      '.hbs',
    ],
    modules: [
      pathTo('./src'),
      'node_modules',
    ],
  },

  plugins: [

    new ProvidePlugin({
      'jQuery': 'jquery', // bootstrap/dist/js/bootstrap.js required jQuery from jquery
      'React': 'react',
      'ReactDOM': 'react-dom',
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
        minimize: isProd(env),
        debug: !isProd(env),
      },
    }),

    !isProd(env) ? new HotModuleReplacementPlugin(): undefined,

    isProd(env) ? new UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true,
        // conditionals: true,
        // unused: true,
        // comparisons: true,
        // sequences: true,
        // dead_code: true,
        // evaluate: true,
        // if_return: true,
        // join_vars: true,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }) : undefined,

    new NoEmitOnErrorsPlugin(),

    new EnvironmentPlugin({ // use DefinePlugin instead
      'NODE_ENV': isProd(env) ? 'production' : 'development',
    }),

    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProd(env) ? env : 'development'),
      },
    }),

    new CommonsChunkPlugin({
      // name: 'vendors',
      names: [
        'app',
        'vendors',
        'polyfills',
        'manifest',
      ],
    }),

    isProd(env) ? new AggressiveMergingPlugin() : undefined,

    new HtmlWebpackPlugin({
      cache: true,
      showErrors: true,
      excludeChunks: [],
      xhtml: true,
      // // chunks: 'all',
      // chunks: [
      //   'manifest',
      //   'polyfills',
      //   'vendors',
      //   'app',
      // ],
      template: './src/assets/index.hbs',
      minify: isProd(env) ? {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      } : false,
    }),

    new ExtractTextWebpackPlugin({
      disable: false,
      allChunks: true,
      filename: filename('css'),
      publicPath: publicPath(env),
    }),

    new BaseHrefWebpackPlugin({
      baseHref: publicPath(env),
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),

    // gzip

    new CompressionWebpackPlugin({
      asset: '[path].gz?[query]', // default: [path].gz[query]
      // algorithm: 'gzip', // zlib, zopfli, function(buf, callback)
      // test: /\.(js|css|html)$/i, // default: every assets
      // threshold: 10240, // default: 0
      // minRatio: 0.8 // default: Only assets that compress better that ratio: 0.8
    }),

  ].filter(plugin => !!plugin),

  devtool: isProd(env) ? 'cheap-module-source-map' : 'inline',

  devServer: {
    port: 8000,
    compress: isProd(env),
    inline: !isProd(env),
    hot: !isProd(env),
    stats: 'minimal',
    // stats: {
    //   assets: true,
    //   children: false,
    //   chunks: false,
    //   hash: false,
    //   modules: false,
    //   publicPath: publicPath(env),
    //   timings: true,
    //   version: false,
    //   warnings: true,
    //   colors: {
    //     green: '\u001b[32m',
    //   }
    // },
    contentBase: pathTo('./src'),
    // historyApiFallback: true,
    historyApiFallback: {
      index: publicPath(env),
    },
    proxy: {
      '/api': proxy(),
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

  bail: true,
  profile: 'web',

});
