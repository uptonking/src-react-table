const baseConfig = require('../../config/jest.base');
const pkgConfig = {
  displayName: 'react-absolute-grid',
  rootDir: '../..',
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
};

module.exports = {
  ...baseConfig,
  ...pkgConfig,
};
