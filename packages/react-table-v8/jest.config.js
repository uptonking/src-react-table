const baseConfig = require('../../config/jest.base');
const pkgConfig = {
  displayName: 'react-table-v8',
  rootDir: '../..',
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
};

module.exports = {
  ...baseConfig,
  ...pkgConfig,
};
