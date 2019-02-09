const webpack = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    __dirname + '/client/src/review.jsx',
    __dirname + '/client/src/styles.css',
    __dirname + '/client/src/index.html'
  ],
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.js$/,
        exclude: [/node_modules\/moment\/*/]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new HtmlWebpackPlugin({
      template: __dirname + '/client/src/index.html'
    }),
    new MiniCssExtractPlugin({
      // Would typically be filename: "[name].css",
      filename: 'styles.css',
      chunkFilename: '[id].css'
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      minRatio: 0.8,
      deleteOriginalAssets: false
    })
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/client/dist'
  },
  performance: {
    maxAssetSize: 750000
  }
};
