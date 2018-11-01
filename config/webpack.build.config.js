const webpack = require('webpack');
const merge = require('webpack-merge');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const baseConfig = require('./webpack.base.config');

const config = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MinifyPlugin()
  ]
};

module.exports = merge(baseConfig, config);
