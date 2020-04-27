const fs = require('fs-extra')
const csv = require('csv-parser')
const checkFile = require('../../../utilities/check-file')

describe('File : States : Screenshots', () => {
  it('exists', () => {
    checkFile('_data/v1/states/screenshots')
  })

  it('matches field pattern', done => {
    const expectedObject = {
      state: expect.anything(),
      url: expect.anything(),
      dateChecked: expect.anything(),
      secondary: expect.anything(),
      date: expect.anything(),
      size: expect.anything(),
    }

    fs.createReadStream('_data/v1/states/screenshots.csv')
      .pipe(csv())
      .on('data', row => {
        expect(row).toEqual(expect.objectContaining(expectedObject))
        expect(Object.keys(row).length).toBe(Object.keys(expectedObject).length)
      })
      .on('end', () => {
        done()
      })
  })
})
