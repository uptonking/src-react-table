const baseConfig = require('./configs/tests/jest.base');
const rootConfig = {
  projects: [
    '<rootDir>/packages/*/jest.config.js',
    // '<rootDir>',
  ],
};

module.exports = {
  ...baseConfig,
  ...rootConfig,
};
