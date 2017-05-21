const path = require('path');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },

  resolve: {
    alias: {
      root: path.resolve(__dirname),
      appPath: path.resolve(__dirname, 'src')
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
          { loader: 'sass-loader' },
          { loader: 'postcss-loader' },
        ],
        // use: ExtractTextPlugin.extract({
        //   use: ['css-loader', 'sass-loader', 'postcss-loader']
        // })
      },

      {
        test: /.(js|jsx)$/,
        exclude: /node_modules|.ejs$/,
        use: ['babel-loader']
      },

      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes our vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    //new ExtractTextPlugin('styles.css'),

    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: './src/index.ejs',

      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      },
      meta: [
        {
          name: 'description',
          content: 'React, Redux, Webpack, Express, MongoDB'
        }
      ],
      mobile: true,
      inlineManifestWebpackName: 'webpackManifest',
      title: 'ManageMyExpenses'
    })
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
