const path = require('path')

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
      { test: /\.css$/,
        loaders: ['style', 'css', 'postcss'] },

      { test: /\.jade$/, loader: 'jade' },

      { test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['ng-annotate?regexp=^.?angular.*$', 'babel'] },

      { test: /\.svg$/, loaders: ['url', 'svgo?useConfig=svgo'] },

      { test: /\.yml$/, loaders: ['json', 'yaml'] },

      { test: /angular-new-router/, loader: 'exports?default="ngNewRouter"' }
    ]
  },

  postcss: function(webpack) { return [
    require('postcss-import')({ addDependencyTo: webpack }),
    require('postcss-nested'),
    require('postcss-custom-properties'),
    require('postcss-custom-media'),
    require('autoprefixer'),
  ] },

  svgo: {
    plugins: [
      { collapseGroups: false },
      { convertTransform: false },
    ]
  },

  resolve: {
    extensions: [ '', '.js' ]
  },

  devServer: {
    historyApiFallback: true,
  },
}
