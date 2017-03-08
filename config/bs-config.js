const config = require('./bs-default-config');

// all requests to /api/** => will redirect on http://localhost:8080/api/**
const httpProxyMiddleware = require('http-proxy-middleware');
const proxy = httpProxyMiddleware('/api', {
  target: 'http://localhost:8080',
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  logLevel: 'debug'
});

// fallback for react-routes
const historyApiFallback = require('connect-history-api-fallback');

module.exports = Object.assign({}, config, {
  server: {
    middleware: [
      proxy,
      historyApiFallback({
        index: config.startPath + config.server.always,
      }),
    ],
  },
});
