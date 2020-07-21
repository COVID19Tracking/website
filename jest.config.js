const setTZ = require('set-tz')

setTZ('America/New_York')

module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`,
  },
  reporters: ['default', 'jest-junit'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    '~plugins/(.*)$': '<rootDir>/plugins/$1',
    '~components/(.*)$': '<rootDir>/src/components/$1',
    '~context/(.*)$': '<rootDir>/src/context/$1',
    '~data/(.*)$': '<rootDir>/src/data/$1',
    '~images/(.*)$': '<rootDir>/src/images/$1',
    '~pages/(.*)$': '<rootDir>/src/pages/$1',
    '~scss/(.*)$': '<rootDir>/src/scss/$1',
    '~templates/(.*)$': '<rootDir>/src/templates/$1',
    '~utilities/(.*)$': '<rootDir>/src/utilities/$1',
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    './src/__tests__/build/index.js',
    './src/__tests__/api/index.js',
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  collectCoverageFrom: [
    './src/**/*.js',
    '!./src/pages/**/*.js',
    '!./src/templates/**/*.js',
    '!./src/stories/**',
    '!./src/__tests__/**',
    '!**/node_modules/**',
    '!./build/**',
  ],
}
