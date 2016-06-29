const S3Plugin = require('webpack-s3-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const merge = require('webpack-merge')
const common = require('./build.config.js')

const config = {
  plugins: [
    new CopyPlugin([{ from: './src/statics' }]),
    new S3Plugin({
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'ap-northeast-1'
      },
      s3UploadOptions: {
        Bucket: 'codingkids.jp'
      }
    })
  ]
}

module.exports = merge.smart(common, config)
