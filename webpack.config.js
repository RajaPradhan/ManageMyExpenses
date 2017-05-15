const path = require('path');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m',
  },
};

module.exports = {
  entry: {
    app: 'appPath/index.js'
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },

  resolve: {
    alias: {
      root: path.resolve(__dirname),
      appPath: path.resolve(__dirname, 'src', 'app')
    }
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ]
      },

      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },

      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } })
  ],

  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: 9000,
    host: 'localhost',
    hot: false,
    compress: false,
    stats: stats,
  }
};
