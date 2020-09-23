import React from 'react'

import Percent from '~components/pages/race/dashboard/percent'

import socialCardStyle from './state.module.scss'

const SocialCardFootnotes = ({ state, stateName }) => {
  if (stateName === 'Utah') {
    // special case
    return (
      <p className={socialCardStyle.notes}>
        <strong>Notes:</strong> Utah has reported race and ethnicity data for{' '}
        <Percent number={state.knownRaceEthPos} /> of cases and{' '}
        <Percent number={state.knownRaceEthDeath} /> of deaths. Graphic only
        includes demographic groups reported by the state. Race categories are
        non-mutually-exclusive and are defined as not Hispanic or Latino.
      </p>
    )
  }
  if (stateName === 'Wyoming') {
    // special case
    return (
      <p className={socialCardStyle.notes}>
        <strong>Notes:</strong> Wyoming has reported race data for{' '}
        <Percent number={state.knownRacePos} /> of cases and{' '}
        <Percent number={state.knownRaceDeath} /> of deaths, and ethnicity data
        for <Percent number={state.knownEthPos} /> of cases and{' '}
        <Percent number={state.knownEthDeath} /> of deaths. Graphic only
        includes demographic groups reported by the state. Race categories are
        non-mutually-exclusive and include both Hispanic/Latino and
        non-Hispanic/Latino ethnicity.
      </p>
    )
  }
  if (stateName === 'United States') {
    // special case
    return (
      <p className={socialCardStyle.notes}>
        <strong>Notes:</strong> Nationwide, the United States has reported race
        and ethnicity data for <Percent number={state.knownRaceEthPos} /> of
        cases and <Percent number={state.knownRaceEthDeath} /> of deaths.
        Graphic includes demographic data reported across all states, using
        standard Census categories where possible. Race categories include both
        Hispanic/Latino and non-Hispanic/Latino ethnicity.
      </p>
    )
  }
  return (
    <p className={socialCardStyle.notes}>
      {state.knownRaceEthPos ? (
        <>
          <strong>Notes:</strong> {stateName} has reported race and ethnicity
          data for <Percent number={state.knownRaceEthPos} /> of cases and{' '}
          <Percent number={state.knownRaceEthDeath} /> of deaths. Graphic only
          includes demographic groups reported by the state. Race categories are
          mutually exclusive and include both Hispanic/Latino and
          non-Hispanic/Latino ethnicity.
        </>
      ) : (
        <>
          <strong>Notes:</strong> {stateName} has reported race data for{' '}
          <Percent number={state.knownRacePos} /> of cases and{' '}
          <Percent number={state.knownRaceDeath} /> of deaths, and ethnicity
          data for <Percent number={state.knownEthPos} /> of cases and{' '}
          <Percent number={state.knownEthDeath} /> of deaths. Graphic only
          includes demographic groups reported by the state. Race categories are
          non-mutually-exclusive and include both Hispanic/Latino and
          non-Hispanic/Latino ethnicity.
        </>
      )}{' '}
    </p>
  )
}

export default SocialCardFootnotes
