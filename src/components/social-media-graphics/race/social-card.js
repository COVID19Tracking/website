import React from 'react'
import classnames from 'classnames'

import Container from '~components/common/container'

import SocialCardFootnotes from './footnotes'
import { getStateStatus, getGroups } from './utils'

import socialCardStyle from './social-card.module.scss'
import ChartRow from './chart-row'
import {
  checkIfAnyAsterisk,
  getAsteriskFootnote,
} from '~components/pages/data/cards/crdt/create-race-data'

const StateRaceBarCharts = ({
  availableMetrics = ['cases', 'deaths'],
  state,
  testHospData,
  combinedStates,
}) => {
  const { groups, worstMetrics } = getGroups(state, testHospData)
  const status = getStateStatus(state, combinedStates)

  const gridClasses = {
    1: socialCardStyle.one,
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
    <>
      <div className={socialCardStyle.innerWrapper}>
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
              worstMetrics={worstMetrics}
            />
          ))}
        </div>
      </div>
      <Container centered>
        <SocialCardFootnotes
          state={state}
          stateName={state.name}
          asteriskFootnote={getAsteriskFootnote(state.name)}
          showSmallNFootnote={checkIfAnyAsterisk(groups)}
        />
      </Container>
    </>
  )
}

export default StateRaceBarCharts
