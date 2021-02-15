import React, { Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import StateRaceSocialCard from './social-card'

const CreateStateRaceSocialCards = () => {
  const data = useStaticQuery(graphql`
    {
      covidRaceDataHomepage {
        statesReportingCases
        statesReportingDeaths
      }
      allCovidRaceDataCombined {
        nodes {
          state
          name
          blackSmallN
          latinXSmallN
          asianSmallN
          aianSmallN
          whiteSmallN
          apiSmallN
          nhpiSmallN
          knownRaceEthPos
          knownRaceEthDeath
          blackPctPos
          blackPctDeath
          blackPositives
          blackDeaths
          whitePctPos
          whitePctDeath
          whitePositives
          whiteDeaths
          nhpiPctPos
          nhpiPctDeath
          nhpiPositives
          nhpiDeaths
          latinXPctPos
          latinXPctDeath
          latinXPositives
          latinXDeaths
          asianPctPos
          asianPctDeath
          asianPositives
          asianDeaths
          aianPctPos
          aianPctDeath
          aianPositives
          aianDeaths
          blackPosPerCap
          blackDeathPerCap
          latinXPosPerCap
          latinXDeathPerCap
          asianPosPerCap
          asianDeathPerCap
          aianPosPerCap
          aianDeathPerCap
          whitePosPerCap
          whiteDeathPerCap
          nhpiPosPerCap
          nhpiDeathPerCap
          apiPosPerCap
          apiDeathPerCap
        }
      }
      allCovidRaceDataSeparate {
        nodes {
          state
          name
          knownRacePos
          knownRaceDeath
          knownEthPos
          blackSmallN
          latinXSmallN
          asianSmallN
          aianSmallN
          whiteSmallN
          apiSmallN
          nhpiSmallN
          knownEthDeath
          blackPctPos
          blackPctDeath
          blackPositives
          blackDeaths
          whitePctPos
          whitePctDeath
          whitePositives
          whiteDeaths
          nhpiPctPos
          nhpiPctDeath
          nhpiPositives
          nhpiDeaths
          latinXPctPos
          latinXPctDeath
          latinXPositives
          latinXDeaths
          asianPctPos
          asianPctDeath
          asianPositives
          asianDeaths
          aianPctPos
          aianPctDeath
          aianPositives
          aianDeaths
          blackPosPerCap
          blackDeathPerCap
          latinXPosPerCap
          latinXDeathPerCap
          asianPosPerCap
          asianDeathPerCap
          aianPosPerCap
          aianDeathPerCap
          whitePosPerCap
          whiteDeathPerCap
          nhpiPosPerCap
          nhpiDeathPerCap
          apiPosPerCap
          apiDeathPerCap
        }
      }
      allCovidStateInfo {
        nodes {
          state
          name
          childSlug {
            slug
          }
        }
      }
      covidRaceDataTimeseries(Date: { ne: null }) {
        Date
      }
    }
  `)

  const states = data.allCovidStateInfo.nodes

  states.unshift({
    state: 'US',
    name: 'United States',
    childSlug: {
      slug: 'united-states',
    },
  })

  const combinedStates = data.allCovidRaceDataCombined.nodes.map(
    node => node.state,
  )

  const lastUpdated = data.covidRaceDataTimeseries.Date

  return (
    <>
      {states.map(state => (
        <Fragment key={state.state}>
          <StateRaceSocialCard
            state={
              data.allCovidRaceDataSeparate.nodes.find(
                node => node.state === state.state,
              ) ||
              data.allCovidRaceDataCombined.nodes.find(
                node => node.state === state.state,
              )
            }
            statesReportingCases={
              data.covidRaceDataHomepage.statesReportingCases
            }
            statesReportingDeaths={
              data.covidRaceDataHomepage.statesReportingDeaths
            }
            combinedStates={combinedStates}
            renderOptions={{
              width: 900,
              height: 472.5,
              relativePath: 'race-dashboard',
              filename: `${state.childSlug.slug}`,
            }}
            lastUpdatedByCtp={lastUpdated}
          />
          <StateRaceSocialCard
            state={
              data.allCovidRaceDataSeparate.nodes.find(
                node => node.state === state.state,
              ) ||
              data.allCovidRaceDataCombined.nodes.find(
                node => node.state === state.state,
              )
            }
            statesReportingCases={
              data.covidRaceDataHomepage.statesReportingCases
            }
            statesReportingDeaths={
              data.covidRaceDataHomepage.statesReportingDeaths
            }
            combinedStates={combinedStates}
            renderOptions={{
              width: 700,
              height: 700,
              relativePath: 'race-dashboard',
              filename: `${state.childSlug.slug}-square`,
            }}
            lastUpdatedByCtp={lastUpdated}
            square
          />
        </Fragment>
      ))}
    </>
  )
}

export default CreateStateRaceSocialCards
