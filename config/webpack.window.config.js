require("webpack");
const path = require("path");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDev ? "development" : "production",
  // Enable source map for development only
  devtool: isDev && "inline-source-map",

  entry: { main: "./index.ts" },
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
      { test: /\.ts$/, use: ["ts-loader"] },
      { test: /\.js$/, enforce: "pre", use: "source-map-loader" },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  target: "electron-main",
};
