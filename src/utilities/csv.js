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
          allCounties(
            filter: { demographics: { total: { gt: 0 } } }
            sort: { fields: [state, name] }
          ) {
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
          allCovidStateDaily(
            sort: { fields: [date, state], order: [DESC, ASC] }
          ) {
            nodes {
              date
              state
              death
              deathConfirmed
              deathIncrease
              deathProbable
              hospitalized
              hospitalizedCumulative
              hospitalizedCurrently
              hospitalizedIncrease
              inIcuCumulative
              inIcuCurrently
              negative
              negativeIncrease
              negativeTestsAntibody
              negativeTestsPeopleAntibody
              negativeTestsViral
              onVentilatorCumulative
              onVentilatorCurrently
              positive
              positiveCasesViral
              positiveIncrease
              positiveScore
              positiveTestsAntibody
              positiveTestsAntigen
              positiveTestsPeopleAntibody
              positiveTestsPeopleAntigen
              positiveTestsViral
              recovered
              totalTestEncountersViral
              totalTestEncountersViralIncrease
              totalTestResults
              totalTestResultsIncrease
              totalTestsAntibody
              totalTestsAntigen
              totalTestsPeopleAntibody
              totalTestsPeopleAntigen
              totalTestsPeopleViral
              totalTestsPeopleViralIncrease
              totalTestsViral
              totalTestsViralIncrease
            }
          }
          allCovidRaceDataTimeseries(
            filter: { Date: { ne: null } }
            sort: { fields: Date, order: DESC }
          ) {
            nodes {
              State
              Date
              Cases_Asian
              Cases_AIAN
              Cases_Black
              Cases_White
              Cases_Other
              Cases_NHPI
              Cases_Multiracial
              Cases_LatinX
              Cases_Ethnicity_NonHispanic
              Cases_Ethnicity_Hispanic
              Cases_Ethnicity_Unknown
              Cases_Total
              Deaths_AIAN
              Deaths_Asian
              Deaths_Black
              Deaths_Ethnicity_Hispanic
              Deaths_Ethnicity_NonHispanic
              Deaths_Ethnicity_Unknown
              Deaths_LatinX
              Deaths_Multiracial
              Deaths_NHPI
              Deaths_Other
              Deaths_White
              Deaths_Total
              Hospitalizations_AIAN: Hosp_AIAN
              Hospitalizations_Asian: Hosp_Asian
              Hospitalizations_Black: Hosp_Black
              Hospitalizations_Ethnicity_Hispanic: Hosp_Ethnicity_Hispanic
              Hospitalizations_Ethnicity_NonHispanic: Hosp_Ethnicity_NonHispanic
              Hospitalizations_Ethnicity_Unknown: Hosp_Ethnicity_Unknown
              Hospitalizations_LatinX: Hosp_LatinX
              Hospitalizations_Multiracial: Hosp_Multiracial
              Hospitalizations_NHPI: Hosp_NHPI
              Hospitalizations_Other: Hosp_Other
              Hospitalizations_White: Hosp_White
              Hospitalizations_Total: Hosp_Total
              Tests_AIAN
              Tests_Asian
              Tests_Black
              Tests_Ethnicity_Hispanic
              Tests_Ethnicity_NonHispanic
              Tests_Ethnicity_Unknown
              Tests_LatinX
              Tests_Multiracial
              Tests_NHPI
              Tests_Other
              Tests_White
              Tests_Total
            }
          }
          allCovidUsDaily(sort: { fields: date, order: DESC }) {
            nodes {
              date
              death
              deathIncrease
              inIcuCumulative
              inIcuCurrently
              hospitalizedIncrease
              hospitalizedCurrently
              hospitalizedCumulative
              negative
              negativeIncrease
              onVentilatorCumulative
              onVentilatorCurrently
              positive
              positiveIncrease
              states
              totalTestResults
              totalTestResultsIncrease
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

          // Generate historical CRDT CSVs.
          const stateRaceEthnicityHistoricalData = {}
          data.allCovidRaceDataTimeseries.nodes.forEach(row => {
            if (
              typeof stateRaceEthnicityHistoricalData[row.State] === 'undefined'
            ) {
              stateRaceEthnicityHistoricalData[row.State] = []
            }
            stateRaceEthnicityHistoricalData[row.State].push(row)
          })

          Object.keys(stateRaceEthnicityHistoricalData).forEach(state => {
            fs.outputFileSync(
              `./public/data/download/${states[state].childSlug.slug}-race-ethnicity-historical.csv`,
              parse(stateRaceEthnicityHistoricalData[state]),
            )
          })

          fs.outputFileSync(
            './public/data/download/all-states-history.csv',
            parse(data.allCovidStateDaily.nodes),
          )

          fs.outputFileSync(
            './public/data/download/national-history.csv',
            parse(data.allCovidUsDaily.nodes),
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
