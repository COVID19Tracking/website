module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    semi: [2, 'never'],
    'jsx-a11y/href-no-hash': ['off'],
    'react/prop-types': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/no-danger': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        comments: 80,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  settings: {
    'import/core-modules': [
      'screenshots',
      'state-history',
      'sample-state',
      'sample-chart-data',
      'sample-openapi',
    ],
    'import/resolver': {
      alias: [
        ['~plugins', './plugins'],
        ['~components', './src/components'],
        ['~context', './src/context'],
        ['~data', './src/data'],
        ['~images', './src/images'],
        ['~pages', './src/pages'],
        ['~scss', './src/scss'],
        ['~templates', './src/templates'],
        ['~utilities', './src/utilities'],
      ],
    },
  },
}
