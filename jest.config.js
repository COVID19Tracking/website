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
    '~components(.*)$': 'src/components/$1',
    '~context(.*)$': 'src/context/$1',
    '~data(.*)$': 'src/data/$1',
    '~images(.*)$': 'src/images/$1',
    '~pages(.*)$': 'src/pages/$1',
    '~scss(.*)$': 'src/scss/$1',
    '~templates(.*)$': 'src/templates/$1',
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    './src/__tests__/build/index.js',
    './build/__tests__/post-build/',
    './build/__tests__/utilities/',
    './build/test.js',
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
