const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanupWebpackPlugin = require('webpack-cleanup-plugin')

module.exports = {
  "entry": {
    "popup": "./popup.js",
    "content": "./content.js",
    "background": "./background.js"
  },
  "output": {
    "path": path.resolve(__dirname, "dist"),
    "filename": "[name].js"
  },
  "module": {
    "rules": [{
      test: /\.js$/,
      use: "babel-loader"
    }]
  },
  "plugins": [
    new HtmlWebpackPlugin({
      template: './template/popup.html',
      inject: 'body',
      filename: 'popup.html',
      chunk: "popup"
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([
      {from: './manifest.json'},
      {from: 'images', to: 'images'}
    ]),
    new CleanupWebpackPlugin()
  ]
}
