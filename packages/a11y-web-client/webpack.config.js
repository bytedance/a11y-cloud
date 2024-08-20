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
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');
const WebpackBar = require('webpackbar');
const common = require('../../config/webpack.base.config');
const { markToolDevPort } = require('../../config/deployment.config');

module.exports = (env, argv) => {
  const isProductionMode = argv.mode === 'production';

  return merge(common, {
    entry: {
      mark: path.join(__dirname, './src/pages/index/index.js'),
    },
    output: {
      path: path.join(__dirname, './dist'),
      filename: isProductionMode ? '[name].min.js' : '[name].js',
      chunkFilename: isProductionMode ? '[name].min.js' : '[name].js',
      // please set publicPath depend on your domain
      // publicPath: '/'
    },
    devtool: isProductionMode ? undefined : 'source-map',
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/,
            name: 'common',
            priority: 10,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    plugins: [
      new WebpackBar({
        name: '【A11y-web-client】',
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './index.html'),
        filename: 'index.html',
        inject: 'body',
        minify: {
          removeComments: false,
          collapseWhitespace: false,
          minifyJS: true,
        },
      }),
      new DefinePlugin({
        'process.env.REACT_APP_I18N_LANG': JSON.stringify(
          process.env.REACT_APP_I18N_LANG || 'en',
        ),
      }),
    ],
    devServer: {
      port: markToolDevPort,
      static: !isProductionMode,
    },
  });
};
