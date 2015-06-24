const path = require('path');
const autoprefixer = require('autoprefixer-core');

module.exports = {

  devtool: 'source-map',

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    filename: '[name].js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css!postcss' },
    ]
  },

  postcss: function() { return [ autoprefixer ] },

  resolve: {
    extensions: [ '', '.js' ]
  },

};
