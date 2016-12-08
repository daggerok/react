import entry   from './entry.babel';
import output  from './output.babel';
import module  from './module.babel';
import plugins from './plugins.babel';
import resolve from './resolve.babel';
import postcss from './postcss.babel';
import eslint  from './eslint.babel';
import node    from './node.babel';

const devtool = 'source-map';

export default {
  entry,
  output,
  module,
  resolve,
  plugins,
  postcss,
  devtool,
  eslint,
  node,
};
