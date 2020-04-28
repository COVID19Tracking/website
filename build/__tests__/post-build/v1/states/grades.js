const fs = require('fs-extra')
const csv = require('csv-parser')
const checkFile = require('../../../utilities/check-file')

describe('File : States : Grades', () => {
  it('exists', () => {
    checkFile('_data/v1/states/grades')
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
      score: expect.anything(),
      notes: expect.anything(),
    }

    fs.createReadStream('_data/v1/states/grades.csv')
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
