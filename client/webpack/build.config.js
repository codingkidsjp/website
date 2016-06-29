const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const merge = require('webpack-merge')
const common = require('./common.config.js')
const fs = require('fs')
const template = fs.readFileSync('./src/index.jade', 'utf8')

const paths = [
  '/',
  '/post',
  '/contact',
  '/about',
  '/entry',
  '/regist'
]

const config = {
  entry: {
    render: './src/render.js'
  },
  module: {

    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?importLoaders=1&modules!postcss-loader'
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
        test: /\.(gif|png|jpe?g|svg)$/,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack'
        ]
      }
    ]
  },

  imageWebpackLoader: {
    bypassOnDebug: true,
    progressive: true,
    optimizationLevel: 7,
    interlaced: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new StaticSiteGeneratorPlugin('render', paths, {template: template}),
    new SitemapPlugin('http://codingkids.jp', paths),
    new CopyPlugin([{ from: './src/statics' }])
  ]
}

module.exports = merge.smart(common, config)
