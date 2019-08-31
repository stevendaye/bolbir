const webpack =  require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

const webpackConfig = {
  devtool: "source-map",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.join(__dirname, "public"),
    publicPath: "/public/",
    filename: "bundle.js"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'HOST': 'https://bolbir.herokuapp.com'
      }
    })
  ]
};

module.exports = webpackConfig;
