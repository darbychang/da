const autoprefixer = require('autoprefixer')
const config = require('./config')
const webpack = require('webpack')

module.exports = {
  devServer: {
    allowedHosts: config.allowedHosts,
    contentBase: false,
    host: '0.0.0.0',
    port: config.webpackDevServerPort,
    stats: { colors: true, modules: false },
  },
  entry: './app/app.jsx',
  module: {
    loaders: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.ls$/, loader: 'livescript-loader' },
      { test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
          'sass-loader',
        ],
      },
    ],
  },
  output: {
    filename: 'app.js',
    path: `${__dirname}/dist`,
  },
}
