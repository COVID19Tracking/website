const fs = require('fs-extra')

describe('API data', () => {
  it('has a press.json file', () => {
    const exists = fs.pathExistsSync('./_data/v1/press.json')
    expect(exists).toBe(true)
  })

  it('has a press.json file with more than 5 rows', () => {
    const content = JSON.parse(fs.readFileSync('./_data/v1/press.json'))
    expect(content.length).toBeGreaterThan(5)
  })

  it('has a us/current.json file', () => {
    const exists = fs.pathExistsSync('./_data/v1/us/current.json')
    expect(exists).toBe(true)
  })

  it('has a us/current.json file with one row', () => {
    const content = JSON.parse(fs.readFileSync('./_data/v1/us/current.json'))
    expect(content.length).toBe(1)
  })

  it('has a us/daily.json file', () => {
    const exists = fs.pathExistsSync('./_data/v1/us/daily.json')
    expect(exists).toBe(true)
  })

  it('has a us/daily.json file has more than 10 rows', () => {
    const content = JSON.parse(fs.readFileSync('./_data/v1/us/daily.json'))
    expect(content.length).toBeGreaterThan(10)
  })

  it('has a states/current.json file', () => {
    const exists = fs.pathExistsSync('./_data/v1/states/current.json')
    expect(exists).toBe(true)
  })

  it('has a states/current.json file has more than 49 rows', () => {
    const content = JSON.parse(
      fs.readFileSync('./_data/v1/states/current.json'),
    )
    expect(content.length).toBeGreaterThan(49)
  })

  it('has a states/daily.json file', () => {
    const exists = fs.pathExistsSync('./_data/v1/states/daily.json')
    expect(exists).toBe(true)
  })

  it('has a states/daily.json file has more than 100 rows', () => {
    const content = JSON.parse(fs.readFileSync('./_data/v1/states/daily.json'))
    expect(content.length).toBeGreaterThan(100)
  })
})
