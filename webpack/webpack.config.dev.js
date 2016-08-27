import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('./webpack/webpack.config.base.js').merge({
  debug: true,
  devtool: 'eval',
  output: {
    pathinfo: true
  },
  devServer: {
    port: 8000,
    hot: true,
    inline: true,
    progress: true,
    colors: true,
    historyApiFallback: true,
    contentBase: 'assets'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
