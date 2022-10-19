const config = require('./webpack.config');
config.mode = 'production';
config.devtool = false;
config.plugins = [...config.plugins];
module.exports = config;
