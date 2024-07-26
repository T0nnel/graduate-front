const path = require('path');

module.exports = {
  // other configurations...
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            },
            {
              loader: 'ts-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
  };
  