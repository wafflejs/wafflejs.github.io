const path = require('path');

module.exports = {

  devtool: 'source-map',

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    filename: '[name].js',
    sourceMapFilename: '[file].map.json',
  },

  module: {
    loaders: [
      { test: /\.svg/, loader: 'url' },
      { test: /\.css$/, loader: 'style!css?importLoaders=1!postcss' },
      { test: /\.jade$/, loader: 'jade' },
      { test: /\.js$/,
        loaders: ['ng-annotate?regexp=^.?angular.*$', 'babel'],
        exclude: /node_modules/ },

      { test: /angular-new-router/, loader: 'exports?default="ngNewRouter"' }
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
