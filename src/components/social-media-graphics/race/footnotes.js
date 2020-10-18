import React from 'react'
import classnames from 'classnames'

import Percent from '~components/pages/race/dashboard/percent'
import { FormatNumber } from '~components/utils/format'

import socialCardStyle from './social-card.module.scss'

const AsteriskFootnote = ({ showSmallNFootnote, asteriskFootnote }) => (
  <div className={socialCardStyle.asteriskFootnote}>
    {showSmallNFootnote && (
      <>
        * Based on fewer than 10 deaths among members of this race/ethnicity.
        Interpret with caution.
      </>
    )}
    {showSmallNFootnote && asteriskFootnote && <br />}
    {asteriskFootnote && (
      <>
        {'† '}
        {asteriskFootnote}
      </>
    )}
  </div>
)

const Notes = ({ state, stateName }) => {
  if (stateName === 'Utah') {
    // special case
    return (
      <>
        <strong>Notes:</strong> Utah has reported race and ethnicity data for{' '}
        <Percent number={state.knownRaceEthPos} /> of cases and{' '}
        <Percent number={state.knownRaceEthDeath} /> of deaths. Graphic only
        includes demographic groups reported by the state. Race categories are
        non-mutually-exclusive and are defined as not Hispanic or Latino.
      </>
    )
  }
  if (stateName === 'Wyoming') {
    // special case
    return (
      <>
        <strong>Notes:</strong> Wyoming has reported race data for{' '}
        <Percent number={state.knownRacePos} /> of cases and{' '}
        <Percent number={state.knownRaceDeath} /> of deaths, and ethnicity data
        for <Percent number={state.knownEthPos} /> of cases and{' '}
        <Percent number={state.knownEthDeath} /> of deaths. Graphic only
        includes demographic groups reported by the state. Race categories are
        non-mutually-exclusive and include both Hispanic/Latino and
        non-Hispanic/Latino ethnicity.
      </>
    )
  }
  return (
    <>
      {state.knownRaceEthPos || state.knownRaceEthDeath ? (
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
          mutually exclusive and include both Hispanic/Latino and
          non-Hispanic/Latino ethnicity.
        </>
      )}
    </>
  )
}

const NationalNotes = ({ statesReportingDeaths, statesReportingCases }) => (
  <>
    <strong>Notes:</strong> Nationwide,{' '}
    <FormatNumber number={statesReportingCases} /> of 56 states and territories
    report race/ethnicity information for cases and{' '}
    <FormatNumber number={statesReportingDeaths} /> of 56 report race/ethnicity
    for deaths. Graphic includes demographic data from all states and
    territories that report, using standard Census categories where possible,
    and scaled to the total US population for each Census category. Race
    categories may overlap with Hispanic/Latino ethnicity. Some rates are
    underestimated due to lack of reporting of race and ethnicity categories for
    COVID-19 cases and deaths.
  </>
)

const SocialCardFootnotes = ({
  state,
  stateName,
  statesReportingDeaths,
  statesReportingCases,
  showSmallNFootnote,
  asteriskFootnote,
}) => (
  <div
    className={classnames(
      socialCardStyle.notes,
      stateName === 'United States' && socialCardStyle.national,
    )}
  >
    <div>
      {stateName === 'United States' ? (
        <NationalNotes
          statesReportingDeaths={statesReportingDeaths}
          statesReportingCases={statesReportingCases}
        />
      ) : (
        <Notes state={state} stateName={stateName} />
      )}
    </div>
    {(showSmallNFootnote || asteriskFootnote) && (
      <AsteriskFootnote
        showSmallNFootnote={showSmallNFootnote}
        asteriskFootnote={asteriskFootnote}
      />
    )}
  </div>
)

export default SocialCardFootnotes
