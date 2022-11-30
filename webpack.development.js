const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'scripts/index.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@styles': path.join(__dirname, 'src', 'styles'),
      '@components': path.join(__dirname, 'src', 'components'),
      '@containers': path.join(__dirname, 'src', 'containers'),
      '@hooks': path.join(__dirname, 'src', 'hooks'),
      '@pages': path.join(__dirname, 'src', 'pages'),
      '@routes': path.join(__dirname, 'src', 'routes'),
      '@assets': path.join(__dirname, 'src', 'assets'),
      '@utils': path.join(__dirname, 'src', 'utils'),
      '@actions': path.join(__dirname, 'src', 'redux/actions'),
      '@reducers': path.join(__dirname, 'src', 'redux/reducers'),
      '@schemas': path.join(__dirname, 'src', 'schemas'),
      '@api': path.join(__dirname, 'src', 'api'),
      '@icons': path.join(__dirname, 'src', 'assets', 'icons'),
      '@context': path.join(__dirname, 'src', 'Context.js'),
      '@storage': path.join(__dirname, 'src', 'storage.js'),
      '@fragments': path.join(__dirname, 'src', 'fragments'),
      '@constants': path.join(__dirname, 'src', 'constants.js'),
    },
  },
  devtool: 'source-map',
  devServer: {
    port: 3001,
    historyApiFallback: true,
    open: false,
    allowedHosts: ['localhost', 'wsl'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/',
          publicPath: '../assets/',
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: path.join(__dirname, 'public', 'favicon.svg'),
    }),
    new Dotenv({
      systemvars: true,
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
