import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import {
  SocialCardHeader,
  getTypeOfRates,
} from '~components/social-media-graphics/race/state'

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

  return (
    <Layout
      title={`${state.name}: ${typeOfRates.replace(/^\w/, c =>
        c.toUpperCase(),
      )} by race and ethnicity`}
      returnLinks={[
        { link: '/race' },
        { link: `/race/dashboard`, title: 'Racial Data Dashboard' },
      ]}
      path={path}
      socialCard={`//covidtracking.com/images/race-dashboard/${state.childSlug.slug}.png`}
    >
      {stateData && (
        <p>
          <SocialCardHeader state={stateData} stateName={stateData.stateName} />
        </p>
      )}
      You can learn more about COVID-19 and its impact on different racial and
      ethnic groups by visiting these pages:
      <ul>
        <li>
          <CtaLink to="race">The COVID Racial Data Tracker</CtaLink>
        </li>
        <li>
          <CtaLink
            to={`/race/dashboard/${stateData &&
              `#state-${stateData.state.toLowerCase()}`}`}
          >
            Racial Data Dashboard
          </CtaLink>
        </li>
        <li>
          <CtaLink to="/race/infection-and-mortality-rates">
            Infection and Mortality Rates by Race and Ethnicity
          </CtaLink>
        </li>
      </ul>
      <img
        src={`/images/race-dashboard/${state.childSlug.slug}.png`}
        alt={`Social card for ${state.name}`}
        className={landingStyles.preview}
      />
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
      state
      stateName
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
    }
    covidRaceDataSeparate(state: { eq: $state }) {
      state
      stateName
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
    }
  }
`
