const { spawn } = require('child_process');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const baseConfig = require('./webpack.base.config');
const build = path.resolve(__dirname, '../build');

const config = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: build,
    stats: {
      colors: true,
      chunks: false,
      children: false
    },
    before() {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError))
    }
  }
};

module.exports = merge(baseConfig, config);

