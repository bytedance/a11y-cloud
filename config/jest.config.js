/** @type {import('jest').Config} */
module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.(less|css)$': 'jest-less-loader',
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
    html: '<html lang="zh-cmn-Hant"></html>',
    userAgent: 'Agent/007',
  },
  globals: {
    window: {
      navigator: {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        platform: 'MacIntel',
      },
      markSocket: {},
      console: {
        log: () => {
          // do nothing
        },
        warn: () => {
          // do nothing
        },
        error: () => {
          // do nothing
        },
      },
      location: {
        href: 'URL_ADDRESS',
        reload: () => {
          // do nothing
        },
        search: '?test=1',
      },
      a11yElectronApi: {
        ip: 'IP_ADDRESS',
      },
      open: () => {
        // do nothing
      },
    },
  },
};