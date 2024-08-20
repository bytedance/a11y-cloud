/*
Copyright (2024) Bytedance Ltd. and/or its affiliates
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const { merge } = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBar = require('webpackbar');
const common = require('../../config/webpack.base.config');
const { sdkDevPort } = require('../../config/deployment.config');

module.exports = (env, argv) => {
  const isProductionMode = argv.mode === 'production';

  return merge(common, {
    entry: {
      sdk: path.join(__dirname, './src/init.js'),
    },
    output: {
      path: path.join(__dirname, './dist'),
      filename: isProductionMode ? '[name].min.js' : '[name].js',
    },
    devtool: isProductionMode ? undefined : 'source-map',
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
      },
    },
    plugins: [
      new WebpackBar({
        name: '【A11y-web-sdk】',
        color: '#ff69b4',
      }),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    devServer: {
      port: sdkDevPort,
      static: !isProductionMode,
    },
  });
};
