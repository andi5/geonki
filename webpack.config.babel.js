import {Config, environment} from 'webpack-config';

environment.setAll({
  env: () => process.env.WEBPACK_ENV || process.env.NODE_ENV || 'dev'
});

export default new Config().extend('./webpack/webpack.config.[env].js');
