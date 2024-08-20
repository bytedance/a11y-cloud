/** @type {import('jest').Config} */
module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.(less|css)$': 'jest-less-loader',
  },
  testEnvironment: 'jsdom',
  globals: {
    window: {
      navigator: {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        platform: 'MacIntel',
      },
      markSocket: {},
      location: {
        href: 'URL_ADDRESS',
        reload: () => {
          // do nothing
        },
        search: '?test=1',
        host: 'localhost',
      },
      a11yElectronApi: {
        ip: 'IP_ADDRESS',
      },
      open: () => {
        // do nothing
      },
      history: {
        pushState: () => {
          // do nothing
        },
        replaceState: () => {
          // do nothing
        },
      },
      dispatchEvent: () => {
        // do nothing
      },
      addEventListener: () => {
        // do nothing
      },
      removeEventListener: () => {
        // do nothing
      },
      requestIdleCallback: () => {
        // do nothing
      },
      getComputedStyle: () => ({
        position: '1',
      }),
      fetch: false,
      localStorage: {
        getItem: () => {},
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
      },
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
    },
  },
};
