# a11y-webpack-loader-react

This project demonstrates how to fully utilize the capabilities of a11y-cloud, providing mock interfaces and data processing capabilities.

[中文版本](./README.CN.md)

## Demo Video

## Running the Project

For demonstration purposes, this project has a customized `start` script that runs the a11y-web-client, a11y-web-sdk, and a11y-web-socket projects simultaneously. To run this project alone, use the `start:node` command.

```
yarn start
```

## Building the Project

For demonstration purposes, this project has a customized `build` script that builds the a11y-web-client, a11y-web-sdk, and a11y-web-socket projects simultaneously. To build this project alone, use the `build:node` command.

```
yarn build
```

## Environment Variables

This project uses a `.env` file to configure the server environment variables, with the default settings as follows:

```
NODE_ENV=production
```

During local development, the environment variables are automatically set when running the `start` or `build` scripts, so developers do not need to worry about them.

## Data DSL

Refer to the data format in [DSL.js](../../DSL.js).
