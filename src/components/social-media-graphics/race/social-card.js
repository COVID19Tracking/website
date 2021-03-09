import React from 'react'
import classnames from 'classnames'

import { renderedComponent } from '~plugins/gatsby-render-components'

import Logo from '~images/ctp-icon-small.png'
import CarLogo from '~images/car-logo-small.png'
import Container from '~components/common/container'

import SocialCardFootnotes from './footnotes'
import SocialCardHeader from './header'
import NoDataSocialCard from './no-data'
import { getStateStatus, getGroups } from './utils'

import socialCardStyle from './social-card.module.scss'
import ChartRow from './chart-row'

const getFootnoteStatuses = (stateGroups, stateName) => {
  const groups = stateGroups
  let showSmallNFootnote = false
  let asteriskFootnote = null

  // if any of the showAsterisk values is true
  groups.forEach(group => {
    if (group.showAsterisk) {
      showSmallNFootnote = true // set showSmallNFootnote to true
    }
  })

  // special case to add an asterisk for Montana AIAN
  if (stateName === 'Montana') {
    groups.forEach((group, index) => {
      if (group.label === 'American Indian/ Alaska Native') {
        groups[index].showCross = true
      }
    })
    asteriskFootnote =
      'Montana includes Native Hawaiians and Other Pacific Islanders in this category.'
  }

  // special case to add an asterisk for New Mexico API
  if (stateName === 'New Mexico') {
    groups.forEach((group, index) => {
      if (group.label === 'Asian\u200a/\u200aPacific Islander') {
        groups[index].showCross = true
      }
    })
    asteriskFootnote =
      'New Mexico defines this category as Asian alone for case data, and Asian/Pacific Islander for death data.'
  }
  return {
    showSmallNFootnote,
    asteriskFootnote,
  }
}

const StateRaceBarCharts = ({
  availableMetrics = ['cases', 'deaths'],
  state,
  testHospData,
  combinedStates,
  square = false,
}) => {
  const { groups, worstMetrics } = getGroups(state, testHospData)
  const status = getStateStatus(state, combinedStates)

  const gridClasses = {
    2: socialCardStyle.two,
    3: socialCardStyle.three,
    4: socialCardStyle.four,
  }

  const headers = availableMetrics
    .map(m => m.charAt(0).toUpperCase() + m.slice(1))
    .map(m => `${m} per 100,000 people`)

  if (headers === undefined || groups === undefined) {
    return (
      <Container centered>
        Per capita data is not available. The US Census does not provide
        population data by race/ethnicity for {state.name}.
      </Container>
    )
  }

  return (
    <div
      className={classnames(
        socialCardStyle.grid,
        gridClasses[availableMetrics.length],
        status.casesOnly && socialCardStyle.casesOnly,
        status.deathsOnly && socialCardStyle.deathsOnly,
      )}
    >
      {/* Spacer for CSS Grid */}
      <span />
      {status.oneChart && <span />}
      {headers.map((header, index) => (
        <span
          className={classnames(
            socialCardStyle.barHeader,
            index !== 0 && socialCardStyle.secondaryHeader,
          )}
        >
          {header}
        </span>
      ))}
      {groups.map(group => (
        <ChartRow
          availableMetrics={availableMetrics}
          group={group}
          stateStatus={status}
          worstMetrics={worstMetrics}
          square={square}
        />
      ))}
    </div>
  )
}

const StateRaceSocialCardInner = ({
  state,
  combinedStates,
  square = false,
  statesReportingCases,
  statesReportingDeaths,
  lastUpdatedByCtp,
}) => {
  if (state === undefined) {
    return <></>
  }
  if (state.name === 'Guam') {
    return <></>
  }
  const stateStatus = getStateStatus(state, combinedStates)

  // handle empty state
  if (stateStatus.noCharts) {
    return <NoDataSocialCard stateName={state.name} square={square} />
  }

  const { groups } = getGroups(state)

  // sort groups by deaths if only deaths are reported
  // (this is sorted by cases in utils.js by default)
  if (stateStatus.deathsOnly) {
    groups.sort((a, b) => {
      // sort bars by # of deaths
      if (a.deaths >= b.deaths) {
        return -1
      }
      return 1
    })
  }

  const headers = []
  if (!stateStatus.deathsOnly) {
    headers.push('Deaths per 100,000 people')
  }

  if (!stateStatus.casesOnly) {
    headers.push('Cases per 100,000 people')
  }

  const { showSmallNFootnote, asteriskFootnote } = getFootnoteStatuses(
    groups,
    state.name,
  )

  return (
    <div
      className={classnames(
        socialCardStyle.wrapper,
        square && socialCardStyle.square,
      )}
    >
      <p className={socialCardStyle.header}>
        <SocialCardHeader
          state={state}
          combinedStates={combinedStates}
          lastUpdatedByCtp={lastUpdatedByCtp}
        />
      </p>
      <StateRaceBarCharts
        headers={headers}
        state={state}
        combinedStates={combinedStates}
        square={square}
      />
      <div className={socialCardStyle.footer}>
        <SocialCardFootnotes
          state={state}
          stateName={state.name}
          statesReportingCases={statesReportingCases}
          statesReportingDeaths={statesReportingDeaths}
          showSmallNFootnote={showSmallNFootnote}
          asteriskFootnote={asteriskFootnote}
        />
        <div className={socialCardStyle.logosContainer}>
          <img src={CarLogo} alt="" className={socialCardStyle.carLogo} />
          <img src={Logo} alt="" className={socialCardStyle.ctpLogo} />
        </div>
      </div>
    </div>
  )
}

const StateRaceSocialCard = renderedComponent(({ ...props }) => (
  <StateRaceSocialCardInner {...props} />
))

export default StateRaceSocialCard

export { StateRaceSocialCard, StateRaceSocialCardInner, StateRaceBarCharts }
