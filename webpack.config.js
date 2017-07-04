const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const plugin = new ExtractTextPlugin({
  filename: '[name].css',
  ignoreOrder: true,
});

module.exports = {
  devServer: {
    host: 'localhost', 
    // public: '0.0.0.0:80', //docker webpack
    port: 8080,
  },
  performance: {
    hints: 'warning', // 'error'
    maxEntrypointSize: 10000000, // entry 200kb
    maxAssetSize: 45000000, // 450kb css
  },
  devtool: 'source-map',
  entry: {
    app: PATHS.app,
    vendor: PATHS.app + '/hdmap-src.js',  //继承react,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  module:{
    rules:[
      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   options: {
      //     emitWarning: true,
      //   },
      // },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-3', 'react'],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: plugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hdmap-pro',
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['./css/style.css', './css/hdmap.css', './css/hdmap.draw.css', 
        './css/Control.MiniMap.css', 
      ],
      append: true,
      publicPath: 'app/',
    }),
    new CopyWebpackPlugin([
      { from: 'app/images', to: 'app/css/images' },
    ]),
    plugin,
    new BabiliPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
};