const path = require('path')
const srcPath = path.resolve(__dirname, '../src')

module.exports = ({ config }) => {
  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve('babel-loader')

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
  ]

  config.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve('@babel/plugin-proposal-class-properties'),
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    require.resolve('babel-plugin-remove-graphql-queries'),
  ]

  config.module.rules.push({
    test: /\.module.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    exclude: /\.module\.s[ac]ss$/,
    include: srcPath,
  })

  config.module.rules.push({
    test: /\.s[ac]ss$/,
    loaders: [
      'style-loader',
      'css-loader',
      { loader: 'sass-loader', options: { modules: true } },
    ],
    include: srcPath,
  })

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ['browser', 'module', 'main']

  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    '~components': path.resolve(__dirname, '../src/components'),
    '~context': path.resolve(__dirname, '../src/context'),
    '~data': path.resolve(__dirname, '../src/data'),
    '~images': path.resolve(__dirname, '../src/images'),
    '~pages': path.resolve(__dirname, '../src/pages'),
    '~scss': path.resolve(__dirname, '../src/scss'),
    '~templates': path.resolve(__dirname, '../src/templates'),
    '~utilities': path.resolve(__dirname, '../src/utilities'),
  }

  return config
}
