const fs = require('fs-extra')

describe('Build has occured', () => {
  it('has a data directory', () => {
    expect(fs.existsSync('_data/v1')).toBeTruthy()
  })
})
