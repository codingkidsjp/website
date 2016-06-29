require('dotenv-safe').load()
const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const projectRoot = path.resolve(__dirname, '../')

module.exports = {
  context: projectRoot,
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router',
      'redux',
      'redux-saga',
      'react-router-redux'
    ],
    app: ['./src/index.js']
  },
  output: {
    path: './dist',
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.css'],
    modulesDirectories: ['node_modules']
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'stylelint',
      exclude: /node_modules/
    }],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.(txt|md)$/,
        loaders: ['raw-loader']
      }, {
        test: /\.json$/,
        loaders: ['json-loader']
      }
    ]
  },

  postcss: (webpack) => {
    return [
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-url')(),
      require('postcss-cssnext')(),
      require('postcss-inline-svg')()
    ]
  },

  plugins: [
    new WebpackNotifierPlugin({excludeWarnings: true}),
    new CleanWebpackPlugin(['dist'], {
      root: projectRoot,
      verbose: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      minChunks: Infinity
    })
  ]
}
