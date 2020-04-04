const fs = require('fs-extra')

const stateNames = require('../../build/datasources/stateNames.js')

const getSortedDatesUnique = dates => [...new Set(dates)].sort()
const getMostRecent = arr => arr[arr.length - 1]

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

  it('has a /public/API/states endpoint with over 1400 items in array', () => {
    const exists = fs.readFileSync('./public/api/states/daily', 'utf8')
    expect(JSON.parse(exists).length).toBeGreaterThan(1484)
  })

  it('has a /public/API/us endpoint with over 28 items in array', () => {
    const exists = fs.readFileSync('./public/api/us/daily', 'utf8')
    expect(JSON.parse(exists).length).toBeGreaterThan(28)
  })

  it('should contain over 50 reports for the most recent date', () => {
    const statesDaily = JSON.parse(
      fs.readFileSync('./public/api/states/daily', 'utf8'),
    )
    const mostRecent = getMostRecent(
      getSortedDatesUnique(statesDaily.map(state => state.dateChecked)),
    )
    const allLatestReports = statesDaily.filter(
      state => state.dateChecked === mostRecent,
    )
    expect(allLatestReports.length).toBeGreaterThan(50)
  })

  it('contains only reports from states that are a subset of states in stateNames.js', () => {
    const statesDaily = JSON.parse(
      fs.readFileSync('./public/api/states/daily', 'utf8'),
    )
    const mostRecent = getMostRecent(
      getSortedDatesUnique(statesDaily.map(state => state.dateChecked)),
    )
    const allLatestReports = statesDaily.filter(
      state => state.dateChecked === mostRecent,
    )
    const arr = [...new Set(allLatestReports.map(item => item.state))]
    expect(Object.keys(stateNames.allStates)).toEqual(
      expect.arrayContaining(arr),
    )
  })
})
