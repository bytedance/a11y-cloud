# a11y-web-sdk

云标签运行时sdk，在代码中接入无障碍能力。

[English Version](./README.md)

## 环境要求

浏览器: 依赖 [Socket.IO](https://www.npmjs.com/package/socket.io)
![Client 版本](https://camo.githubusercontent.com/40fa0971ae4554132eaa9669afdc0a5ed63c315de05dcf22fdb68a6cdec42728/68747470733a2f2f73617563656c6162732e636f6d2f62726f777365722d6d61747269782f736f636b65742e737667)

## 项目运行

```
yarn start
```

默认构建出的产物地址为 `http://localhost:3010/sdk.js`

## 项目构建

```
yarn build
```

## 数据 DSL

数据格式请参考 [DSL.js](../../DSL.js)

## 注意事项

- 需要同时启用 [a11y-web-socket](../a11y-web-socket/) 项目，才可正常收发数据
- 与云标签标注工具 [a11y-web-client](../a11y-web-client/) 配合使用
- **详细使用方法请参考主项目 [a11y-cloud](https://github.com/bytedance/a11y-cloud)**
