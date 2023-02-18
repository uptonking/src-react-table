const path = require('path');
const { merge } = require('webpack-merge');
const devServerConfig = require('../../../webpack/webpack.server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = merge(devServerConfig, {
  // entry: path.resolve(__dirname, '../src/render.jsx'),
  entry: path.resolve(__dirname, '../sample/render.jsx'),
  output: {
    // filename: '[name].bundle.js',
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/',
  },

  // module: {
  //   rules: [
  //   ]},

  plugins: [
    new HtmlWebpackPlugin({
      // template: path.resolve(process.cwd(), 'demo.html'),
      template: './public/index.html',
      // filename: 'index.html',
    }),
    new NodePolyfillPlugin({
      excludeAliases: ['console'],
    }),
  ],
  devServer: {
    // contentBase: path.resolve(__dirname, '../dist'),
    port: 8990,
  },
});
