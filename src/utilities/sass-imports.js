module.exports = [
  'type.module.scss',
  'helpers.module.scss',
  'colors.module.scss',
  'links.module.scss',
  'breakpoints.module.scss',
]
  .map(file => `@import '~scss/${file}';`)
  .join('\n')
