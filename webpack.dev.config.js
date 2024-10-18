const path = require('path')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = [
  {
    mode: 'production',
    entry: './src/settings',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      publicPath: '',
      path: path.resolve(__dirname, 'dist'),
      filename: 'settings.js'
    },
    performance: {
      hints: false
    },
    plugins: [
      new NodePolyfillPlugin()
    ],
    watch: true
  }
]
