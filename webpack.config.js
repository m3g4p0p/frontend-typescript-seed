const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { resolve, join } = require('path');
const src = resolve(__dirname, 'src');
const dist = resolve(__dirname, 'dist');

module.exports =  ({ production = false } = {}) => ({
  entry: join(src, 'main.ts'),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: [
          {
            loader: 'tslint-loader',
            options: { /* Loader options go here */ },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(src, 'index.html'),
      minify: {
        removeComments: production,
        collapseWhitespace: production,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: production ? 'production' : 'development',
  devtool: production ? false : 'inline-source-map',
  devServer: {
    contentBase: dist,
    port: 0024,
    compress: true,
  },
  output: {
    filename: 'bundle.js',
    path: dist,
    publicPath: '/',
  },
});
