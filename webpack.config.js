const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const app = require("./src/config/app.json");

function modify(buffer) {
  const manifest = JSON.parse(buffer.toString());
  manifest.name = app.title;
  manifest.description = app.description;

  return JSON.stringify(manifest, null, 2);
}

module.exports = (env, options) => {
  const isProd = options.mode === "production";
  const config = {
    mode: options.mode,
    entry: {
      index: "./src/index.tsx",
    },
    output: {
      path: resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      chunkFilename: "data/[name].[contenthash].chunk.js",
      assetModuleFilename: "assets/fonts/[name].[ext]",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(woff|woff2)(\?.*)?$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        ...app,
        template: "src/index.ejs",
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "./src/assets", to: "./assets" },
          {
            from: "./src/manifest.json",
            to: "./manifest.json",
            transform(content) {
              return modify(content);
            },
          },
        ],
      }),
    ],
  };

  if (isProd) {
    config.devtool = "source-map";
    config.optimization = {
      usedExports: true,
      minimizer: [new TerserWebpackPlugin({ extractComments: false })],
    };
  } else {
    config.devtool = "eval-source-map";
    config.devServer = {
      port: 8080,
      open: true,
      hot: true,
      static: {
        directory: resolve(__dirname, "src/assets"),
        publicPath: '/',
        watch: true,
      },
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    };
  }

  return config;
};
