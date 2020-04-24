const fs = require('fs-extra')
const checkFile = require('../../../utitlities/check-file')

describe('File : US : All days', () => {
  it('generated a file for every day', async done => {
    const days = await fs.readJSON('_data/v1/us/daily.json')
    days.forEach(day => {
      checkFile(`_data/v1/us/${day.date}`)
    })
    done()
  })
})
