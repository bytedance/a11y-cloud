module.exports = {
  roots: ['<rootDir>'],
  projects: ['<rootDir>'],
  extensionsToTreatAsEsm: ['./src/**/*.js', './__test__/**/*.js'],
  transformIgnorePatterns: ['/node_modules/(?!@myorg)/.+\\.js$'],
  testRegex: '__test__/.*\\.spec\\.jsx?$',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/index.js'],
  coverageDirectory: '__test__/coverage',
  displayName: '',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {}
};
