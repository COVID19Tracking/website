import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '~components/layout'

import {
  getTypeOfRates,
  getStateStatus,
} from '~components/social-media-graphics/race/utils'
import SocialCardHeader from '~components/social-media-graphics/race/header'

import landingStyles from './landing.module.scss'

export default ({ pageContext, path, data }) => {
  const state = pageContext

  const stateData = data.covidRaceDataSeparate || data.covidRaceDataCombined

  if (stateData === null) {
    return <></>
  }

  const combinedStates = data.allCovidRaceDataCombined.nodes.map(
    node => node.state,
  )

  const typeOfRates = getTypeOfRates(stateData, combinedStates)

  const { noCharts } = getStateStatus(stateData, combinedStates)

  return (
    <Layout
      title={`${state.name}: ${typeOfRates.replace(/^\w/, c =>
        c.toUpperCase(),
      )} by race and ethnicity`}
      returnLinks={[
        { link: '/race' },
        {
          link: '/race/infection-and-mortality-rates',
          title: 'Infection and Mortality Rates',
        },
      ]}
      path={path}
      socialCard={`//covidtracking.com/images/race-dashboard/${state.childSlug.slug}.png`}
      centered
    >
      {stateData && (
        <p>
          <SocialCardHeader
            state={stateData}
            stateName={stateData.name}
            noCharts={noCharts}
            combinedStates={combinedStates}
          />
        </p>
      )}
      <img
        src={`/images/race-dashboard/${state.childSlug.slug}.png`}
        alt={`Social card for ${state.name}`}
        className={landingStyles.preview}
      />
      <p className={landingStyles.ctasHeader}>
        You can learn more about COVID-19 and its impact on different racial and
        ethnic groups by visiting these pages:
      </p>
      <ul className={landingStyles.ctas}>
        <li>
          <Link to="/race">The COVID Racial Data Tracker</Link>
        </li>
        <li>
          <Link
            to={`/race/dashboard/${stateData &&
              `#state-${stateData.state.toLowerCase()}`}`}
          >
            Racial Data Dashboard
          </Link>
        </li>
        <li>
          <Link to="/race/infection-and-mortality-rates">
            Infection and Mortality Rates by Race and Ethnicity
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query($state: String!) {
    covidStateInfo(state: { eq: $state }) {
      childPopulation {
        population
      }
    }
    allCovidRaceDataCombined {
      nodes {
        state
      }
    }
    covidRaceDataCombined(state: { eq: $state }) {
      aianDeathPerCap
      aianDeaths
      aianPctDeath
      aianPctPos
      aianPositives
      aianPosPerCap
      aianSmallN
      apiDeathPerCap
      apiPosPerCap
      apiSmallN
      asianDeathPerCap
      asianDeaths
      asianPctDeath
      asianPctPos
      asianPositives
      asianPosPerCap
      asianSmallN
      blackDeathPerCap
      blackDeaths
      blackPctDeath
      blackPctPos
      blackPositives
      blackPosPerCap
      blackSmallN
      deathRateSmallN
      knownRaceEthDeath
      knownRaceEthPos
      latinXDeathPerCap
      latinXDeaths
      latinXPctDeath
      latinXPctPos
      latinXPositives
      latinXPosPerCap
      latinXSmallN
      name
      nhpiDeathPerCap
      nhpiDeaths
      nhpiPctDeath
      nhpiPctPos
      nhpiPositives
      nhpiPosPerCap
      nhpiSmallN
      state
      whiteDeathPerCap
      whiteDeaths
      whitePctDeath
      whitePctPos
      whitePositives
      whitePosPerCap
      whiteSmallN
    }
    covidRaceDataSeparate(state: { eq: $state }) {
      state
      name
      deathRateSmallN
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
`
