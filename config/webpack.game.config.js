require("webpack");
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  context: path.resolve(__dirname, ".."),
  mode: isDev ? "development" : "production",
  // Enable source map for development only
  devtool: isDev && "inline-source-map",
  devServer: {
    publicPath: "/",
  },

  entry: { renderer: "./src/Main.ts" },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    sourceMapFilename: "[file].map",
  },
  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      { test: /\.ts$/, use: ["ts-loader"], exclude: /node_modules/ },
      { test: /\.js$/, enforce: "pre", use: "source-map-loader" },
      {
        test: /\.png$/,
        use: ["url-loader?mimetype=image/png"],
      },
      {
        test: /\.jpg$/,
        use: ["url-loader?mimetype=image/jpg"],
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  plugins: [
    new HtmlPlugin({
      title: "Leeched",
      filename: "index.html",
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin([{ from: "src/assets", to: "assets" }]),
    // @ts-ignore
    new WriteFilePlugin([
      { test: /\.png$/, useHashIndex: true },
      { test: /\.jpg$/, useHashIndex: true },
    ]),
  ],

  target: "electron-renderer",
};
