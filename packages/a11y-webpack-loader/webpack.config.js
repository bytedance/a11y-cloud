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

module.exports = (env, argv) => {
  const isProductionMode = argv.mode === 'production';

  return merge(common, {
    entry: {
      index: path.join(__dirname, './src/index.js')
    },
    output: {
      path: path.join(__dirname, './dist'),
      filename: isProductionMode ? '[name].min.js' : '[name].js',
      libraryTarget: 'commonjs2'
    },
    devtool: isProductionMode ? undefined : 'source-map',
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        vm: require.resolve('vm-browserify'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        fs: require.resolve('node-libs-browser/mock/empty')
      },
    },
    plugins: [
      new WebpackBar({
        name: '【A11y-webpack-loader】'
      }),
      new CleanWebpackPlugin()
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ]
    }
  });
};
