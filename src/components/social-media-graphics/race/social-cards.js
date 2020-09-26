import React from 'react'
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
          blackPosPercap
          blackDeathPercap
          latinXPosPercap
          latinXDeathPercap
          asianPosPercap
          asianDeathPercap
          aianPosPercap
          aianDeathPercap
          whitePosPercap
          whiteDeathPercap
          nhpiPosPercap
          nhpiDeathPercap
          apiPosPercap
          apiDeathPercap
        }
      }
      allCovidRaceDataSeparate {
        nodes {
          state
          name
          knownRacePos
          knownRaceDeath
          knownEthPos
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
          blackPosPercap
          blackDeathPercap
          latinXPosPercap
          latinXDeathPercap
          asianPosPercap
          asianDeathPercap
          aianPosPercap
          aianDeathPercap
          whitePosPercap
          whiteDeathPercap
          nhpiPosPercap
          nhpiDeathPercap
          apiPosPercap
          apiDeathPercap
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

  return (
    <>
      {states.map(state => (
        <>
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
            square
          />
        </>
      ))}
    </>
  )
}

export default CreateStateRaceSocialCards
