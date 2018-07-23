const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let config = {

  entry: './src/index.js', // entry file
  output: {
    path: path.resolve(__dirname, './public'), // ouput path
    filename: 'output.js' // output filename
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/, // files ending with .js
        exclude: /node_modules/, // exclude the node_modules directory
        loader: "babel-loader" // use this (babel-core) loader
      },
      {
        test: /\.scss$/, // files ending with .scss
        use: ExtractTextWebpackPlugin.extract({ // call our plugin with extract method
          use: ['css-loader', 'sass-loader'], // use these loaders
          fallback: 'style-loader' // fallback for any CSS not extracted
        }) // end extract
      },
      // CSS HOT LOADER
      // {
      //   test: /\.scss$/, // files ending with .scss
      //   use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
        
      //     fallback: 'style-loader',
      //     use: ['css-loader', 'sass-loader', 'postcss-loader'],   
      //   })),
      // },
      {
        test: /\.jsx$/, // all files ending with .jsx
        loader: 'babel-loader', // use the babel-loader for all .jsx files
        exclude: /node_modules/ // exclude searching for files in the node_modules directory
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {  // images loader
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        //exclude: /node_modules/,
        //include: __dirname,
      },
    ] // end rules
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'), // call the ExtractTextWebpackPlugin constructor and name our css file
    //new NodemonPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'), // A directory or URL to serve HTML content from.
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    inline: true, // inline mode (set to false to disable including client scripts (like livereload)
    open: true // open default browser while launching
  },
  devtool: 'eval-source-map' // enable devtool for better debugging experience
}

if (process.env.NODE_ENV === 'production') {
  module.exports.mode = 'production';
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;