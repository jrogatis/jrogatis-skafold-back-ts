const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: ['./src/index'],
  target: 'node',
  resolve: {
    extensions: ['.ts', '.json'],
    alias: {
      '@config': path.resolve(__dirname, './src/config/'),
      '@middleware': path.resolve(__dirname, './src/middleware/'),
      '@services': path.resolve(__dirname, './src/services/'),
      '@resources': path.resolve(__dirname, './src/resources/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@shared': path.resolve(__dirname, './src/shared/'),
      '@emailTemplates': path.resolve(__dirname, './src/emailTemplates/'),
    },
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
