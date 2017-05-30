/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
  entry: './js/main.jsx',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  node: {
    fs: "empty"
  }
}