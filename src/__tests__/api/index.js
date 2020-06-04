const fetch = require('node-fetch')

const host = process.env.JEST_COVID_API_HOST

describe('Fetch API data', () => {
  it('has status API', done => {
    fetch(`${host}/api/v1/status.json`)
      .then(response => {
        expect(
          Array.isArray(response.headers.raw()['access-control-allow-origin']),
        ).toBe(true)
        expect(response.headers.raw()['access-control-allow-origin'][0]).toBe(
          '*',
        )
        return response.json()
      })
      .then(status => {
        expect(status).toHaveProperty('runNumber')
        expect(status).toHaveProperty('buildTime')
        done()
      })
      .catch(error => {
        expect(error).toBe(false)
        done()
      })
  })

  it('has states daily API', done => {
    fetch(`${host}/api/v1/states/daily.json`)
      .then(response => {
        expect(
          Array.isArray(response.headers.raw()['access-control-allow-origin']),
        ).toBe(true)
        expect(response.headers.raw()['access-control-allow-origin'][0]).toBe(
          '*',
        )
        return response.json()
      })
      .then(data => {
        expect(data.length).toBeGreaterThan(100)
        done()
      })
      .catch(error => {
        expect(error).toBe(false)
        done()
      })
  })

  it('has US daily API', done => {
    fetch(`${host}/api/v1/us/daily.json`)
      .then(response => {
        expect(
          Array.isArray(response.headers.raw()['access-control-allow-origin']),
        ).toBe(true)
        expect(response.headers.raw()['access-control-allow-origin'][0]).toBe(
          '*',
        )
        return response.json()
      })
      .then(data => {
        expect(data.length).toBeGreaterThan(40)
        done()
      })
      .catch(error => {
        expect(error).toBe(false)
        done()
      })
  })

  it('proxies old state URLs', done => {
    fetch(`${host}/api/states.json`)
      .then(response => {
        expect(
          Array.isArray(response.headers.raw()['access-control-allow-origin']),
        ).toBe(true)
        expect(response.headers.raw()['access-control-allow-origin'][0]).toBe(
          '*',
        )
        return response.json()
      })
      .then(data => {
        expect(data.length).toBeGreaterThan(40)
        done()
      })
      .catch(error => {
        expect(error).toBe(false)
        done()
      })
  })

  it('proxies old US date URLs with parameters', done => {
    fetch(`${host}/api/us?date=20200501`)
      .then(response => {
        expect(
          Array.isArray(response.headers.raw()['access-control-allow-origin']),
        ).toBe(true)
        expect(response.headers.raw()['access-control-allow-origin'][0]).toBe(
          '*',
        )
        return response.json()
      })
      .then(data => {
        expect(data.date).toBe(20200501)
        done()
      })
      .catch(error => {
        expect(error).toBe(false)
        done()
      })
  })

  it('proxies old state URLs with multiple parameters', done => {
    fetch(`${host}/api/states/daily?state=ca&date=20200501`)
      .then(response => {
        expect(
          Array.isArray(response.headers.raw()['access-control-allow-origin']),
        ).toBe(true)
        expect(response.headers.raw()['access-control-allow-origin'][0]).toBe(
          '*',
        )
        return response.json()
      })
      .then(data => {
        expect(data.date).toBe(20200501)
        done()
      })
      .catch(error => {
        expect(error).toBe(false)
        done()
      })
  })
})
