
const path = require('path');

const config = {

  entry: {
    bundle: './src/client/js/app.js'
  },

  output: {
    path: __dirname + '/package/client'
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }

};

module.exports = config;
