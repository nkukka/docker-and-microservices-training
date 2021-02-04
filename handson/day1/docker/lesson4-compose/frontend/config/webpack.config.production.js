const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0:9000'),
  'process.env.FACEBOOK_APP_ID': JSON.stringify(process.env.FACEBOOK_APP_ID || ''),
};

module.exports = merge(config, {
  devtool: 'source-map',
  entry: {
    main: ['babel-polyfill', path.join(__dirname, '../src/index.jsx')],
  },
  plugins: [
    new CleanWebpackPlugin(['build/*'], { root: path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '../src/public/images'),
      to: 'images',
    }]),
    new MinifyPlugin({}, { sourceMap: null }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
  module: {
    loaders: [],
  },
});
