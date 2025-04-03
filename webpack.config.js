const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true },
    module: {
      rules: [
        {
          test: /.ts$/, use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /.css$/,
          use: [
            'style-loader', 
            'css-loader'
          ]
        },
        {
          test: /.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext]'
          }
        },
        {
          test: /\.(mp3|wav|ogg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'sfx/[name][ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: [
        '.ts',
        '.js'
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: './src/assets',
            to: 'assets'
          }
        ]
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      open: true
    }
  };
