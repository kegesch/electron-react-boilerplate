const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ElectronNativePlugin = require("electron-native-plugin");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, '../src')
const build = path.resolve(__dirname, '../build');

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
              outputPath: build
            }
          },
          "source-map-loader"
        ],
        enforce: "pre"
      },
      {
        test: /\.node$/,
        use: "electron-native-loader"
      }
    ]
  },
  output: {
    path: build,
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
  },
  node: {
    __dirname: false,
    __filename: false
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin(),
    new ElectronNativePlugin({
      optionalDependencies: true
    }),
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  },
  externals: {
    bindings: 'require("bindings")'
  }
};
