
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {

  mode: 'development',

  devtool: 'inline-source-map',

  output: {
    filename: '[name].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'views/index.pug'
    })
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  devServer: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }

});
