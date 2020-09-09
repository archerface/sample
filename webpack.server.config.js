const path = require('path')
const nodeExternals = require('webpack-node-externals')
const WebpackShellPlugin = require('webpack-shell-plugin')

const { NODE_ENV = 'production' } = process.env

module.exports = {
  mode: NODE_ENV,
  devtool: 'inline-source-map', // why not for now?
  target: 'node',
  watch: NODE_ENV === 'development',
  entry: './src/server/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist/server/'),
    filename: 'index.js'
  },
  externals: [nodeExternals()],
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ['yarn run:dev-server']
    })
  ]
}
