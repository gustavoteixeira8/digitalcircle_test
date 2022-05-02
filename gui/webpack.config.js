const { resolve } = require('path')

module.exports = {
  mode: 'production',
  entry: resolve(__dirname, 'src', 'main.js'),
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'public', 'assets', 'js'),
    publicPath: resolve(__dirname, 'public', 'assets')
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  devtool: 'source-map',
}
