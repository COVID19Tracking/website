module.exports = ['breakpoints', 'colors', 'grid', 'helpers', 'links', 'type']
  .map(file => `@import '~scss/${file}.module.scss';`)
  .join('\n')
