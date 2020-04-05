const fs = require('fs-extra')

describe('Website build', () => {
  it('has a homepage', () => {
    const exists = fs.pathExistsSync('./public/index.html')
    expect(exists).toBe(true)
  })

  it('has a data page', () => {
    const exists = fs.pathExistsSync('./public/data/index.html')
    expect(exists).toBe(true)
  })

  it('has an API page', () => {
    const exists = fs.pathExistsSync('./public/api/index.html')
    expect(exists).toBe(true)
  })
})
