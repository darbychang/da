var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './app/entry.js',
  resolve: {
    alias: {
      jquery: '../node_modules/jquery/dist/jquery.min.js',
      react: '../node_modules/react/dist/react.min.js'
    }
  },
  output: {
    filename: 'app.js',
    path: 'build'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jade$/, loader: 'jade' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.ls$/, loader: 'livescript' },
      { test: /\.(jpg|png)$/, loader: 'url?limit=100000' },
      { test: /\.styl$/, loader: 'style!css!stylus' }
    ],
    noParse: /jquery|react/
  },
  plugins: [
    new htmlWebpackPlugin({ title: 'da' })
  ],
  devServer: {
    contentBase: './build',
    inline: true
  }
};
// vi:et:nowrap
