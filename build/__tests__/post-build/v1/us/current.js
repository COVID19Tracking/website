const fs = require('fs-extra')
const checkFile = require('../../../utitlities/check-file')

describe('File : US : Current', () => {
  it('exists', () => {
    checkFile('_data/v1/us/current')
  })
})
