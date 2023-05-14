const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/index.html',
		}),
	],
	devServer: {
		port: 8080,
		static: {
			directory: path.resolve(__dirname, './dist'),
			publicPath: './dist',
		},
		hot: true,
		proxy: {
			'/': {
				target: 'http://localhost:3000/',
				secure: false,
			},
		},
	},
	module: {
		rules: [
			{
				test: /jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										targets: 'defaults',
									},
								],
								[
									'@babel/preset-react',
									{
										targets: 'defaults',
									},
								],
							],
						},
					},
				],
			},
			{
				test: /scss$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
};
