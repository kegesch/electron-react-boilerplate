const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { spawn } = require('child_process')
const ElectronNativePlugin = require("electron-native-plugin");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src')

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'babel-loader' }],
        include: defaultInclude
      },
      {
        test: /\.js$/,
        use: [
          "electron-native-patch-loader",
          {
            loader: "electron-native-loader",
            options: {
              outputPath: path.resolve(__dirname, 'dist')
            }
          },
          "source-map-loader"
        ],
        enforce: "pre"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin(),
    new ElectronNativePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
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
