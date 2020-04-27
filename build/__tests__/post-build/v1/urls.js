const fs = require('fs-extra')
const csv = require('csv-parser')
const checkFile = require('../../utilities/check-file')

describe('File : Urls', () => {
  it('exists', () => {
    checkFile('_data/v1/urls')
  })

  it('follows field patterns', async done => {
    const expectedObject = {
      kind: expect.any(String),
      name: expect.any(String),
      filter: expect.any(String),
    }

    fs.createReadStream('_data/v1/urls.csv')
      .pipe(csv())
      .on('data', row => {
        expect(row).toEqual(expect.objectContaining(expectedObject))
      })
    done()
  })
})
