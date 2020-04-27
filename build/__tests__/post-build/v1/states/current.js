const fs = require('fs-extra')
const csv = require('csv-parser')
const checkFile = require('../../../utilities/check-file')

describe('File : States : Current', () => {
  it('exists', () => {
    checkFile('_data/v1/states/current')
  })

  it('matches field pattern', done => {
    const expectedObject = {
      state: expect.anything(),
      positive: expect.anything(),
      positiveScore: expect.anything(),
      negativeScore: expect.anything(),
      negativeRegularScore: expect.anything(),
      commercialScore: expect.anything(),
      grade: expect.anything(),
      dataQualityGrade: expect.anything(),
      score: expect.anything(),
      negative: expect.anything(),
      pending: expect.anything(),
      hospitalizedCurrently: expect.anything(),
      hospitalizedCumulative: expect.anything(),
      inIcuCurrently: expect.anything(),
      inIcuCumulative: expect.anything(),
      onVentilatorCurrently: expect.anything(),
      onVentilatorCumulative: expect.anything(),
      recovered: expect.anything(),
      lastUpdateEt: expect.anything(),
      checkTimeEt: expect.anything(),
      death: expect.anything(),
      hospitalized: expect.anything(),
      total: expect.anything(),
      totalTestResults: expect.anything(),
      posNeg: expect.anything(),
      fips: expect.anything(),
      dateModified: expect.anything(),
      dateChecked: expect.anything(),
      notes: expect.anything(),
      hash: expect.anything(),
    }

    fs.createReadStream('_data/v1/states/current.csv')
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
