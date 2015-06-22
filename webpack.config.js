const path = require('path');

module.exports = {

  devtool: 'source-map',

  entry: './index.js',

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
    ]
  },

  resolve: {
    extensions: [ '', '.js' ]
  },

};
