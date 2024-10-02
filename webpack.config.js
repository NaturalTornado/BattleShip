// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // Set mode to development for better debugging
  entry: "./src/index.js", // Entry point for the application
  output: {
    filename: "main.js", // Name of the output bundle
    path: path.resolve(__dirname, "dist"), // Output directory
    clean: true, // Clean output directory before each build
  },
  devtool: "eval-source-map", // Enable source maps for easier debugging
  devServer: {
    watchFiles: ["./src/template.html"], // Watch template file for changes
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", // Template file for HTML output
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i, // Apply this rule for CSS files
        use: ["style-loader", "css-loader"], // Use both loaders for CSS
      },
      {
        test: /\.html$/i, // Apply this rule for HTML files
        loader: "html-loader", // Use html-loader to process HTML
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Apply this rule for image files
        type: "asset/resource", // Use asset module for images
      },
      {
        test: /\.(js|mjs|cjs)$/, // Apply this rule for JavaScript files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel loader for transpiling JS
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }] // Preset for modern JS
            ],
            plugins: ['@babel/plugin-proposal-class-properties'] // Enable class properties
          }
        }
      },
    ],
  },
};
