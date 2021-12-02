const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.bundle.js',
    publicPath: '/',
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      styles: path.join(__dirname, 'src', 'styles'),
      components: path.join(__dirname, 'src', 'components'),
      containers: path.join(__dirname, 'src', 'containers'),
      hooks: path.join(__dirname, 'src', 'hooks'),
      pages: path.join(__dirname, 'src', 'pages'),
      routes: path.join(__dirname, 'src', 'routes'),
      assets: path.join(__dirname, 'src', 'assets'),
      utils: path.join(__dirname, 'src', 'utils'),
      context: path.join(__dirname, 'src', 'Context.js'),
      storage: path.join(__dirname, 'src', 'storage.js'),
    },
  },
  devtool: 'source-map',
  devServer: { port: 5000, historyApiFallback: true, open: true },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(jpg|jpeg|png|gif|mp3|svg)$/, use: ['file-loader'] },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new Dotenv(),
  ],
};
