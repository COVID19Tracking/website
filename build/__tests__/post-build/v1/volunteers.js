const fs = require('fs-extra')
const checkFile = require('../../utilities/check-file')

describe('File : Volunteers', () => {
  it('exists', () => {
    checkFile('_data/v1/volunteers')
  })

  it('follows field patterns', async done => {
    const results = await fs.readJSON('_data/v1/volunteers.json')
    results.forEach(result => {
      expect(result).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          website: expect.any(String),
        }),
      )
    })
    done()
  })
})
