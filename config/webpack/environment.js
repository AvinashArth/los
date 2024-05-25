const { environment } = require('@rails/webpacker');
const { resolve } = require('path');
const webpack = require('webpack');

environment.loaders.append('jsx', {
  test: /\.jsx?$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
  exclude: /node_modules/,
});

environment.config.merge({
  resolve: {
    extensions: ['.js', '.jsx'],
  },
});

module.exports = environment;
