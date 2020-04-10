const path = require('path');
const HtlmWebpackPlugin = require('html-webpack-plugin');
const SRC_DIR = path.join(__dirname, '/src');
const BUILD_DIR = path.join(__dirname, '/build');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: `bundle.js`,
    path: BUILD_DIR,
    publicPath: '',
    //publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: path.join('/static', 'media'),
        },
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }
    ],
  },
  plugins: [
    new HtlmWebpackPlugin({ template: `${SRC_DIR}/index.html`}),
  ],
};