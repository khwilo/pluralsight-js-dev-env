import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  mode   : 'production',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'source-map',
  entry  : {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main  : path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path      : path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename  : '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test  : /[\\/]node_modules[\\/]/,
          name  : 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    // Global loader configuration
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug   : false,
      noInfo  : false
    }),
    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[md5:contenthash:hex:20].css'),
    // Hash the files using MD5 so that their names change when content changes
    new WebpackMd5Hash(),
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
      inject: true,
      // Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: 'be846940e638463d9b9762e308a18c7f'
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
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap')
      }
    ]
  }
};
