const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	// 输入
	entry: ['./src/index.ts'],
	// 输出
	output: {
		filename: 'scripts/[name].[contenthash:5].js',
		// 输出路径
		path: path.resolve(__dirname, '../dist'),
	},
	resolve: {
		// 导入时省略的脚本后缀
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.png/,
				type: 'asset/resource',
			},
			{
				test: /.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /.ts$/,
				use: ['ts-loader'],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		// 清理插件，每次编译之前清空dist目录
		new CleanWebpackPlugin(),
		// 样式合并输出到css文件
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash:5].css',
		}),
		// 根据模板生成html文件
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
		}),
	],
};
