const fs = require('fs-extra')
const { parse } = require('json2csv')

module.exports = (graphql, reporter) => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allCovidStateInfo(filter: { name: { ne: null } }) {
            nodes {
              name
              state
              childSlug {
                slug
              }
            }
          }
          allCounties(filter: { demographics: { total: { gt: 0 } } }) {
            nodes {
              name
              state
              current {
                cases
                deaths
              }
              demographics {
                total
                largestRace1
                largestRace2
              }
            }
          }
          allCovidStateDaily(sort: { fields: date, order: DESC }) {
            nodes {
              state
              date
              hospitalizedCumulative
              hospitalizedCurrently
              hospitalizedIncrease
              inIcuCumulative
              inIcuCurrently
              onVentilatorCumulative
              onVentilatorCurrently
              negative
              negativeIncrease
              negativeRegularScore
              negativeTestsViral
              positive
              positiveCasesViral
              positiveIncrease
              positiveScore
              positiveTestsViral
              recovered
              totalTestResults
              totalTestResultsIncrease
              totalTestsViral
              dataQualityGrade
              hospitalized
              deathProbable
              deathIncrease
              deathConfirmed
              death
              dateModified
            }
          }
        }
      `)
        .then(result => {
          const { data } = result
          const states = {}
          data.allCovidStateInfo.nodes.forEach(state => {
            states[state.state] = state
          })

          const stateData = {}
          data.allCovidStateDaily.nodes.forEach(row => {
            if (typeof stateData[row.state] === 'undefined') {
              stateData[row.state] = []
            }
            stateData[row.state].push(row)
          })

          Object.keys(stateData).forEach(state => {
            fs.outputFileSync(
              `./public/data/download/${states[state].childSlug.slug}-history.csv`,
              parse(stateData[state]),
            )
          })

          fs.outputFileSync(
            './public/data/download/all-states-history.csv',
            parse(data.allCovidStateDaily.nodes),
          )

          reporter.success(`Saved state CSV files`)

          const allCounties = data.allCounties.nodes.map(county => {
            return {
              state: county.state,
              countyName: county.name,
              ...county.demographics,
              ...county.current,
              casesPer100k:
                (county.current.cases / county.demographics.total) * 100000,
              deathsPer100k:
                (county.current.deaths / county.demographics.total) * 100000,
            }
          })

          fs.outputFileSync(
            './public/race/data/covid-county-by-race.csv',
            parse(allCounties),
          )

          reporter.success(`Saved CRDT county files`)
        })
        .catch(error => {
          reject(error)
        }),
    )
  })
}
