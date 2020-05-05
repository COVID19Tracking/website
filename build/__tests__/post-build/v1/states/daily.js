const fs = require('fs-extra')
const csv = require('csv-parser')
const checkFile = require('../../../utilities/check-file')

describe('File : States : Daily', () => {
  it('exists', () => {
    checkFile('_data/v1/states/daily')
  })

  it('matches field pattern', done => {
    const expectedObject = {
      date: expect.anything(),
      state: expect.anything(),
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
      dateChecked: expect.anything(),
      death: expect.anything(),
      hospitalized: expect.anything(),
      total: expect.anything(),
      totalTestResults: expect.anything(),
      posNeg: expect.anything(),
      fips: expect.anything(),
      deathIncrease: expect.anything(),
      hospitalizedIncrease: expect.anything(),
      negativeIncrease: expect.anything(),
      positiveIncrease: expect.anything(),
      totalTestResultsIncrease: expect.anything(),
      lastUpdateEt: expect.anything(),
      grade: expect.anything(),
    }

    fs.createReadStream('_data/v1/states/daily.csv')
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
