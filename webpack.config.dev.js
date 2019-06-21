import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  mode   : 'development',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'inline-source-map',
  entry  : [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path      : path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename  : 'bundle.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug   : true,
      noInfo  : false
    }),
    // Create HTML file that includes reference to bundle.js
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify  : {
        removeComments               : true,
        collapseWhitespace           : true,
        removeRedundantAttributes    : true,
        useShortDoctype              : true,
        removeEmptyAttributes        : true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash             : true,
        minifyJS                     : true,
        minifyCSS                    : true,
        minifyURLs                   : true
      },
      inject: true
    })
  ],
  module : {
    rules: [
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      },
      {
        test: /\.css$/,
        use : ['style-loader', 'css-loader']
      }
    ]
  }
};
