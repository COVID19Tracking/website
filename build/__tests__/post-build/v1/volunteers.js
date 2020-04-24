const fs = require('fs-extra')
const checkFile = require('../../utitlities/check-file')

describe('File : Volunteers', () => {
  it('exists', () => {
    checkFile('_data/v1/volunteers')
  })
})
