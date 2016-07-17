require('dotenv-safe').load()
const path = require('path')

const projectRoot = path.resolve(__dirname, '../')

module.exports = {
  context: projectRoot,
  entry: 'raw!jade!./src/tumblr/index.jade',
  output: {
    path: './dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.css']
  },
  module: {
    preLoaders: [{
      test: /\.css$/,
      loader: 'stylelint',
      exclude: /node_modules/
    }],
    loaders: [
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader?importLoaders=1&modules!postcss-loader'
        ]
      }, {
        test: /\.svg$/,
        loaders: [
          'raw-loader',
          'image-webpack'
        ]
      }, {
        test: /\.(gif|png|jpe?g)$/,
        loaders: [
          'raw-loader',
          'image-webpack'
        ]
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

  imageWebpackLoader: {
    bypassOnDebug: true,
    progressive: true,
    optimizationLevel: 7,
    interlaced: false
  }
}
