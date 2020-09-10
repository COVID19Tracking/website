import React, { useEffect } from 'react'
import { graphql, Link, navigate } from 'gatsby'
import Layout from '~components/layout'
import { SocialCardLede } from '~components/social-media-graphics/race/state'

import shareStyles from '~components/social-media-graphics/race/state.module.scss'

export default ({ pageContext, path, data }) => {
  const state = pageContext

  const stateData = data.covidRaceDataSeparate || data.covidRaceDataCombined

  // todo make typeOfRates dynamic

  useEffect(() => {
    setTimeout(() => {
      navigate(`/race/dashboard/#state-${stateData.state.toLowerCase()}`)
    }, 4000)
  }, [])

  return (
    <Layout
      title={`${state.name}: Infection and death rates`}
      returnLinks={[
        { link: '/race' },
        { link: `/race/dashboard`, title: 'Racial Data Dashboard' },
      ]}
      path={path}
      socialCard={`//covidtracking.com/images/race-dashboard/${state.childSlug.slug}.png`}
    >
      {stateData && (
        <SocialCardLede
          typeOfRates="Infection and death rates"
          state={stateData}
          population={data.covidStateInfo.childPopulation.population}
          stateName={stateData.stateName}
        />
      )}
      <p>
        <Link to={`/race/dashboard/#${state}`}>
          Check out the Racial Data Dashboard
        </Link>
      </p>
      <img
        src={`/images/race-dashboard/${state.childSlug.slug}.png`}
        alt={`Social card for ${state.name}`}
        className={shareStyles.preview}
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
