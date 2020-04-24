const fs = require('fs-extra')
const csv = require('csv-parser')
const checkFile = require('../../utitlities/check-file')

describe('File : Press', () => {
  it('exists', () => {
    checkFile('_data/v1/press')
  })

  it('matches field pattern', done => {
    fs.createReadStream('_data/v1/press.csv')
      .pipe(csv())
      .on('data', row => {
        expect(row).toEqual(
          expect.objectContaining({
            title: expect.anything(),
            url: expect.anything(),
            addToCovidTrackingProjectWebsite: expect.anything(),
            featureOnCovidTrackingProjectHomepage: expect.anything(),
            aboutCovidTrackingProject: expect.anything(),
            publishDate: expect.anything(),
            continuallyUpdated: expect.anything(),
            publication: expect.anything(),
            author: expect.anything(),
            doesThisSourceHaveADataVisualization: expect.anything(),
            dataSource: expect.anything(),
            usesCovidTrackingData: expect.anything(),
            linkToVizImage: expect.anything(),
            twitterCopy: expect.anything(),
            language: expect.anything(),
          }),
        )
      })
      .on('end', () => {
        done()
      })
  })
})
