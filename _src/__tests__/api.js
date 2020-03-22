const fetch = require('node-fetch')

describe('Data API', () => {
  it('returns state data', done => {
    fetch('https://covid.cape.io/states')
      .then(response => {
        return response.text()
      })
      .then(data => {
        let stateData = false
        // JSON data is valid
        expect(() => {
          stateData = JSON.parse(data)
        }).not.toThrow()

        if (stateData) {
          expect(stateData.length).toBeGreaterThan(49)

          const state = stateData.pop()
          expect(state).toHaveProperty('state')
          expect(state).toHaveProperty('positive')
          expect(state).toHaveProperty('lastUpdateEt')
        }

        done()
      })
  })

  it('returns state info', done => {
    fetch('https://covid.cape.io/states/info')
      .then(response => {
        return response.text()
      })
      .then(data => {
        let stateData = false
        // JSON data is valid
        expect(() => {
          stateData = JSON.parse(data)
        }).not.toThrow()

        if (stateData) {
          expect(stateData.length).toBeGreaterThan(49)

          const state = stateData.pop()
          expect(state).toHaveProperty('state')
          expect(state).toHaveProperty('name')
        }

        done()
      })
  })
})

it('returns state daily data', done => {
  fetch('https://covid.cape.io/states/daily')
    .then(response => {
      return response.text()
    })
    .then(data => {
      let stateData = false
      // JSON data is valid
      expect(() => {
        stateData = JSON.parse(data)
      }).not.toThrow()

      if (stateData) {
        expect(stateData.length).toBeGreaterThan(49)

        const state = stateData.pop()
        expect(state).toHaveProperty('state')
        expect(state).toHaveProperty('positive')
        expect(state).toHaveProperty('negative')
        expect(state).toHaveProperty('pending')
        expect(state).toHaveProperty('hospitalized')
        expect(state).toHaveProperty('death')
        expect(state).toHaveProperty('total')
      }

      done()
    })
})

it('returns US data', done => {
  fetch('https://covid.cape.io/us')
    .then(response => {
      return response.text()
    })
    .then(data => {
      let usData = false
      // JSON data is valid
      expect(() => {
        usData = JSON.parse(data).pop()
      }).not.toThrow()

      if (usData) {
        expect(usData).toHaveProperty('positive')
        expect(usData).toHaveProperty('negative')
        expect(usData).toHaveProperty('hospitalized')
        expect(usData).toHaveProperty('death')
        expect(usData).toHaveProperty('total')
      }

      done()
    })
})

it('returns US daily data', done => {
  fetch('https://covid.cape.io/us/daily')
    .then(response => {
      return response.text()
    })
    .then(data => {
      let usData = false
      // JSON data is valid
      expect(() => {
        usData = JSON.parse(data)
      }).not.toThrow()

      if (usData) {
        expect(usData.length).toBeGreaterThan(10)

        const date = usData.pop()

        expect(date).toHaveProperty('date')
        expect(date).toHaveProperty('states')
        expect(date).toHaveProperty('positive')
        expect(date).toHaveProperty('negative')
        expect(date).toHaveProperty('posNeg')
        expect(date).toHaveProperty('pending')
        expect(date).toHaveProperty('hospitalized')
        expect(date).toHaveProperty('death')
      }

      done()
    })
})
