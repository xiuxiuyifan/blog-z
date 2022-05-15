const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackAssetPlugin = require("./plugins/AssetPlugin");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    page1: "./src/page1.js",
    page2: "./src/page2.js",
    page3: "./src/page3.js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      minChunks: 1,
      // 最大的同步加载请求数
      maxInitialRequests: 5,
      // 最大异步加载请求数
      maxAsyncRequests: 3,
      // 按照某些条件把某些模块重新组合。用来对模块进行分组的
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "page1.html",
      chunks: ["page1"], // 插入分类出去的代码块
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "page2.html",
      chunks: ["page2"],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "page3.html",
      chunks: ["page3"],
    }),
    new WebpackAssetPlugin(),
  ],
};
