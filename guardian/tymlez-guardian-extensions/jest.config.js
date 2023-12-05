module.exports = {
  setupFiles: ['<rootDir>/../.jest/vars.js'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@tymlez/backend-libs': '<rootDir>../../../packages/backend-libs/src',
    '@tymlez/common-libs': '<rootDir>../../../packages/common-libs/src',
  },
};
