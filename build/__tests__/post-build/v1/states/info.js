const fs = require('fs-extra')
const csv = require('csv-parser')
const checkFile = require('../../../utitlities/check-file')

describe('File : States : Info', () => {
  it('exists', () => {
    checkFile('_data/v1/states/info')
  })

  it('matches field pattern', done => {
    fs.createReadStream('_data/v1/states/info.csv')
      .pipe(csv())
      .on('data', row => {
        expect(row).toEqual(
          expect.objectContaining({
            state: expect.anything(),
            covid19SiteOld: expect.anything(),
            covid19Site: expect.anything(),
            covid19SiteSecondary: expect.anything(),
            twitter: expect.anything(),
            pui: expect.anything(),
            pum: expect.anything(),
            notes: expect.anything(),
            fips: expect.anything(),
            name: expect.anything(),
          }),
        )
      })
      .on('end', () => {
        done()
      })
  })
})
