const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackBrowserPlugin = require('webpack-browser-plugin')

const merge = require('webpack-merge')
const common = require('./common.config.js')

const config = {
  debug: true,
  cache: true,
  devtool: 'inline-source-map',
  entry: {
    vendor: ['webpack-hot-middleware/client'],
    app: ['webpack-hot-middleware/client'],
    index: 'file?name=index.html!jade-html!./src/index.jade'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?importLoaders=1&modules&localIdentName=[path][name]--[local]--[hash:base64:5]!postcss-loader'
        ),
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'
        ),
        include: /node_modules/
      }, {
        test: /\.(gif|png|jpe?g)$/,
        loaders: ['file?name=[name].[ext]']
      }, {
        test: /\.inline\.svg$/,
        loaders: ['raw-loader']
      }, {
        test: /\.svg$/,
        exclude: /\.inline\.svg$/,
        loaders: ['file?name=[name].[ext]']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackBrowserPlugin()
  ],

  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: { colors: true }
  }
}
module.exports = merge(common, config)
