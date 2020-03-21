const dotenvSetup = require('./server/dotenv')

dotenvSetup()

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  bail: 0,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './apis/**/*',
    './repositories/**/*',
    './common/**/*',
    './workers/**/*',
    './entities/models/**/*'
  ],
  coverageDirectory: '__tests__/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '.webpack/',
    'schema.js',
    './apis/graphql/modules/context.js'
  ],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/']
}
