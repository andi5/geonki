import {Config} from 'webpack-config';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default new Config().merge({
  entry: ['babel-polyfill', 'bootstrap-loader', './app/main/geonki/main.tsx'],
  output: {
    path: path.resolve(__dirname, '../target'),
    publicPath: '/assets/gen/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'ts-loader'},
      {test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery'},
      {test: /\.[s]?css$/, loader: ExtractTextPlugin.extract('style', 'css!sass?outputStyle=expanded')},
    ],
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {test: /\.js$/, loader: 'source-map-loader'}
    ],
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  },
  resolve: {
    root: path.resolve('./app/main/geonki'),
    extensions: ['', '.ts', '.tsx', '.js', '.css', '.scss'],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
});
