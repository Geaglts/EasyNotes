const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.bundle.js',
    publicPath: '/',
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: { port: 3030, historyApiFallback: true },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.(ts|tsx)$/, exclude: /node_modules/, use: ['ts-loader'] },
      { test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(jpg|jpeg|png|gif|mp3|svg)$/, use: ['file-loader'] },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
};
