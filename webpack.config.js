/* eslint-env node */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const marked = require('marked')
marked.setOptions({ smartypants: true, mangle: false })

module.exports = {

  devtool: 'source-map',

  entry: {
    'dist/main': './index.js',
    'dist/vendor': [
      'angular',
      'angular-marked',
      'angular-ui-router',
      'd3',
      'heap',
      'lodash',
    ]
  },

  output: {
    filename: '[name].js',
    sourceMapFilename: '[file].map.json',
  },

  module: {
    loaders: [
      { test: /\.css$/,
        loaders: ['style', 'css', 'postcss'] },

      { test: /\.jade$/, loader: 'jade' },
      { test: /\.html/, loader: 'html' },

      { test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['ng-annotate?regexp=^.?angular.*$', 'babel?presets=es2015'] },

      { test: /\.md$/, loaders: ['html', 'handlebars-unsmarten', 'markdown?smartypants=true'] },

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
    require('postcss-calc'),
    require('autoprefixer'),
  ] },

  svgo: {
    plugins: [
      { collapseGroups: false },
      { convertTransform: false },
    ]
  },

  resolve: {
    extensions: [ '', '.js' ],
    root: path.resolve(__dirname),
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './index.jade', inject: 'head' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'dist/vendor' }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en$/),
  ],

  devServer: {
    historyApiFallback: true,
  },
}
