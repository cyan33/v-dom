let webpack = require('webpack');

module.exports = {
  entry: './app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  "source-map": "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          plugins: [
            ['transform-react-jsx', {pragma: 'hyperscript'}],
            'transform-class-properties'
          ]
        }
      }
    ]
  }
}
