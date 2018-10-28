const path = require("path");

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: 'node_modules',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
};
