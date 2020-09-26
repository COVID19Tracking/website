import React from 'react'
import classnames from 'classnames'

import Percent from '~components/pages/race/dashboard/percent'
import { FormatNumber } from '~components/utils/format'

import socialCardStyle from './social-card.module.scss'

const SocialCardFootnotes = ({
  state,
  stateName,
  statesReportingDeaths,
  statesReportingCases,
}) => {
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
      <p
        className={classnames(socialCardStyle.notes, socialCardStyle.national)}
      >
        <strong>Notes:</strong> Nationwide,{' '}
        <FormatNumber number={statesReportingCases} /> of 56 states and
        territories report race/ethnicity information for cases and{' '}
        <FormatNumber number={statesReportingDeaths} /> of 56 report
        race/ethnicity for deaths. Graphic includes demographic data from all
        states and territories that report, using standard Census categories
        where possible, and scaled to the total U.S. population for each Census
        category. Race categories may overlap with Hispanic/Latino ethnicity.
        Some rates are underestimated due to lack of reporting of race and
        ethnicity categories for COVID-19 cases and deaths.
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
          mutually exclusive and defined as not Hispanic or Latino.
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
