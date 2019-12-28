const webpack = require('webpack');
const dotenv = require('dotenv');
// webpack configuration object for bundling assets and exposing .env variables to client
module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  // webpack configuration object defining entry point, what files to bundle, and which to exclude
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
    //custom plugin to expose .env to client
    plugins: [
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
