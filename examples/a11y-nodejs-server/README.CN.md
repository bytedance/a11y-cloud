# a11y-nodejs-server

本项目用来演示如何完整的使用 a11y-cloud 能力，项目本身提供 mock 接口和数据处理能力。

[English Version](./README.md)

## 演示视频

## 项目运行

为了方便演示，本项目定制化了 `start` 脚本，会同时运行 a11y-web-client、 a11y-web-sdk 和 a11y-web-socket 三个项目。如需单独运行本项目，可使用 `start:node` 命令。

```
yarn start
```

## 项目构建

为了方便演示，本项目定制化了 `build` 脚本，会同时运行 a11y-web-client、 a11y-web-sdk 和 a11y-web-socket 三个项目。如需单独运行本项目，可使用 `build:node` 命令。

```
yarn build
```

## 环境变量

本项目使用 `.env` 文件来配置服务端的环境变量，默认配置如下：

```
NODE_ENV=production
```

本地开发时，环境变量会在运行 `start` 或 `build`脚本时自动设置，开发者无需关心。

## 数据 DSL

数据格式请参考 [DSL.js](../../DSL.js)
