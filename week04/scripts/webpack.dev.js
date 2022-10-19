const config = require('./webpack.config');
const path = require('path');

config.mode = 'development';
config.devtool = 'source-map';
config.devServer = {
	hot: true,
	port: 8080,
};

module.exports = config;
