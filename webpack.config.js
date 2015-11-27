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
      { test: /\.svg/, loader: 'url' },
      { test: /\.css$/, loader: 'style!css!postcss' },
      { test: /\.jade$/, loader: 'jade' },
      { test: /\.js$/,
        loaders: ['ng-annotate?regexp=^.?angular.*$', 'babel'],
        exclude: /node_modules/ },
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
