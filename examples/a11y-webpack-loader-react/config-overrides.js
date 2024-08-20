const { override } = require('customize-cra');

module.exports = override((config, env) => {
  config.devServer = {
    ...config.devServer,
    setupMiddlewares: (middlewares) => middlewares,
  };
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('a11y-webpack-loader'),
          },
        },
      ],
    },
  };
});
