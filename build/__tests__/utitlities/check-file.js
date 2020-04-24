const fs = require('fs-extra')

module.exports = name => {
  ;['json', 'csv', 'html'].forEach(suffix => {
    expect(fs.existsSync(`${name}.${suffix}`)).toBeTruthy()
  })
}
