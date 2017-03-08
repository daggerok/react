export default env => ({
  // chunks: [
  //   'vendors',
  //   'app',
  // ],
  chunks: 'all',
  filename: 'index.html',
  favicon: './src/assets/favicon.ico',
  template: './src/assets/index.html',
  minify: env !== 'development' ? {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  } : false,
});
