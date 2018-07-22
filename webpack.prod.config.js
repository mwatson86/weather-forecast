
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const baseConfig = require('./webpack.base.config.js');

const extractSass = new MiniCssExtractPlugin({
  filename: '[name].[hash].css'
});

const assetsPluginInstance = new AssetsPlugin({
  path: 'src/server/resources'
});

module.exports = merge(baseConfig, {

  mode: 'production',

  entry: {
    vendors: [
      'react',
      'react-dom',
      'moment'
    ]
  },

  output: {
    filename: '[name].[hash].js',
    publicPath: '/public'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          test: 'vendors',
          name: 'vendors',
        }
      }
    }
  },

  plugins: [
    extractSass,
    assetsPluginInstance
  ],

  stats: {
    warnings: false
  }

});
