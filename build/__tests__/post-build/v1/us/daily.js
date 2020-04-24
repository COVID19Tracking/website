const fs = require('fs-extra')
const checkFile = require('../../../utitlities/check-file')

describe('File : US : Daily', () => {
  it('exists', () => {
    checkFile('_data/v1/us/daily')
  })
})
