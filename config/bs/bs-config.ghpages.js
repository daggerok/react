const config = require('./bs-config');
const historyApiFallback = require('connect-history-api-fallback');

const publicPath = '/react/';
const outputPath = './dist';

config.server.middleware[1] = historyApiFallback({
  index: publicPath + 'index.html',
});

config.server.always = publicPath + 'index.html';
config.server.baseDir = outputPath;

config.files = [
  outputPath + 'index.html',
  outputPath + '**/*.*',
];

config.startPath = publicPath;
config.serveStatic = [
  outputPath,
];

module.exports = config;
