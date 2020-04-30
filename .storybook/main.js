module.exports = {
  stories: ['../src/stories/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  showPanel: false,
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '~components': 'src/components',
      '~context': 'src/context',
      '~data': 'src/data',
      '~images': 'src/images',
      '~pages': 'src/pages',
      '~scss': 'src/scss',
      '~templates': 'src/templates',
    }
    return config
  }
}
