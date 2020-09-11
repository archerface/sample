const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { NODE_ENV = 'production' } = process.env

const config = {
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  devtool: 'inline-source-map', // why not for now?
  target: 'web',
  entry: './src/client/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/client/'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

module.exports = config
