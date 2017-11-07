const path = require('path');

module.exports = {
  entry: './public/js/main.js',
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
  devServer: {
    port: 3000
  },
  devtool: 'source-map'
}