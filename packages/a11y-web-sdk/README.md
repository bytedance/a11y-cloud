# a11y-web-sdk

Cloud Label Runtime SDK, integrating accessibility capabilities into the code.

[中文版本](./README.CN.md)

## Environment Requirements

Browser: depending on [Socket.IO](https://www.npmjs.com/package/socket.io)
![Client 版本](https://camo.githubusercontent.com/40fa0971ae4554132eaa9669afdc0a5ed63c315de05dcf22fdb68a6cdec42728/68747470733a2f2f73617563656c6162732e636f6d2f62726f777365722d6d61747269782f736f636b65742e737667)

## Running the Project

```
yarn start
```

The default build output address is `http://localhost:3010/sdk.js`

## Building the Project

```
yarn build
```

## Data DSL

Refer to the data format in [DSL.js](../../DSL.js)

## Notes

- The [a11y-web-socket](../a11y-web-socket/) project needs to be enabled simultaneously to ensure normal data transmission and reception.
- It is used in conjunction with the Cloud Label Annotation Tool [a11y-web-client](../a11y-web-client/).
- **For detailed usage, please refer to the main project [a11y-cloud](https://github.com/bytedance/a11y-cloud).**
