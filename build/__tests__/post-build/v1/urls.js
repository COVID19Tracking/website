const fs = require('fs-extra')
const checkFile = require('../../utilities/check-file')

describe('File : Urls', () => {
  it('exists', () => {
    checkFile('_data/v1/urls')
  })

  it('follows field patterns', async done => {
    const results = await fs.readJSON('_data/v1/urls.json')
    // To-do: Filter and StateID should be in every field row, but it is missing from a few states
    results.forEach(result => {
      expect(result).toEqual(
        expect.objectContaining({
          kind: expect.any(String),
          name: expect.any(String),
          url: expect.any(String),
        }),
      )
    })
    done()
  })
})
