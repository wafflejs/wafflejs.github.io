const path = require('path');

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
      { test: /\.svg/, loader: 'url' },
    ]
  },

  postcss: function() { return [
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-custom-properties')
  ] },

  resolve: {
    extensions: [ '', '.js' ]
  },

};
