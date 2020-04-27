const fs = require('fs-extra')
const csv = require('csv-parser')
const checkFile = require('../../../utilities/check-file')

describe('File : US : Current', () => {
  it('exists', () => {
    checkFile('_data/v1/us/current')
  })

  it('follows field patterns', done => {
    const expectedObject = {
      positive: expect.anything(),
      negative: expect.anything(),
      pending: expect.anything(),
      hospitalizedCurrently: expect.anything(),
      hospitalizedCumulative: expect.anything(),
      inIcuCurrently: expect.anything(),
      inIcuCumulative: expect.anything(),
      onVentilatorCurrently: expect.anything(),
      onVentilatorCumulative: expect.anything(),
      recovered: expect.anything(),
      hash: expect.anything(),
      lastModified: expect.anything(),
      death: expect.anything(),
      hospitalized: expect.anything(),
      total: expect.anything(),
      totalTestResults: expect.anything(),
      posNeg: expect.anything(),
      notes: expect.anything(),
    }

    fs.createReadStream('_data/v1/us/current.csv')
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
