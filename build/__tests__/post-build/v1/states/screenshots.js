const fs = require('fs-extra')
const csv = require('csv-parser')
const checkFile = require('../../../utilities/check-file')

describe('File : States : Screenshots', () => {
  it('exists', () => {
    checkFile('_data/v1/states/screenshots')
  })

  it('matches field pattern', done => {
    fs.createReadStream('_data/v1/states/screenshots.csv')
      .pipe(csv())
      .on('data', row => {
        expect(row).toEqual(
          expect.objectContaining({
            state: expect.anything(),
            url: expect.anything(),
            dateChecked: expect.anything(),
            secondary: expect.anything(),
            date: expect.anything(),
            size: expect.anything(),
          }),
        )
      })
      .on('end', () => {
        done()
      })
  })
})
