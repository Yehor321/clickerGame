const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    filename: 'index_bundle.js'
  },
  // optimization: {
  //   nodeEnv: 'production',
  //   minimize: true,
  //   minimizer: [new UglifyJsPlugin({
  //     include: /\.min\.js$/,
  //     sourceMap: true
  //   })],
  //   runtimeChunk: false,
  //   splitChunks: {
  //     cacheGroups: {
  //       default: false,
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor_app',
  //         chunks: 'all',
  //         minChunks: 2
  //       }
  //     }
  //   }
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.((s*)css|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    // compress: true,
    hot: true,
    inline: true,
    disableHostCheck: true,
    // headers: {
    //   "Access-Control-Allow-Origin": "*"
    // },
    historyApiFallback: {
      disableDotRule: true
    }
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // new PreloadWebpackPlugin({
    //   rel: 'preload',
    //   include: 'initial',
    // })
  ]
};