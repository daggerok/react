const { assign } = Object;

const httpProxyMiddleware = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');

const config = require('./bs-config.default.js');

const proxy = httpProxyMiddleware('/api', {
  target: 'http://localhost:8080',
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  logLevel: 'debug'
});
// fallback for react-routes
const staticDir = './dist';
const publicPath = '/';

module.exports = assign({}, config, {

  server: {
    always: 'index.html',
    baseDir: staticDir,
    middleware: [
      proxy,
      historyApiFallback({
        index: publicPath
      }),
    ],
  },

  files: [
    staticDir + '/index.html',
    staticDir + '/**/*.*',
  ],

  startPath: publicPath,

  serveStatic: [
    staticDir,
  ],
});
