const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: `${__dirname}/client/src/index.jsx`,
    module: {
      rules: [
        {
          test: [/\.jsx$/],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        },
      ],
    },
    output: {
      filename: 'bundle.js',
      path: `${__dirname}/client/dist`,
    },
    node: {
      fs: 'empty',
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
