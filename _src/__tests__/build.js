const fs = require('fs')

describe('Built website', () => {
  it('has a homepage', done => {
    fs.readFile('./_site/index.html', (error, data) => {
      expect(error).toBeFalsy()
      done()
    })
  })

  it('has a data page with a state', done => {
    fs.readFile('./_site/data/index.html', (error, data) => {
      expect(error).toBeFalsy()
      expect(data.toString().search('California')).toBeGreaterThan(-1)
      done()
    })
  })

  it('created a state data page', done => {
    fs.readFile('./_site/data/state/california/index.html', (error, data) => {
      expect(error).toBeFalsy()
      done()
    })
  })
})
