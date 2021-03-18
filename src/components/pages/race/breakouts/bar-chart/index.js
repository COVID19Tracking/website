import React from 'react'
import classnames from 'classnames'

import Container from '~components/common/container'
import {
  checkIfAnyAsterisk,
  getAsteriskFootnote,
} from '~components/pages/data/cards/crdt/create-race-data'

import SocialCardFootnotes from './footnotes'
import { getStateStatus, getGroups } from './utils'
import ChartRow from './chart-row'

import barChartStyle from './bar-chart.module.scss'

const StateRaceBarCharts = ({
  availableMetrics = ['cases', 'deaths'],
  state,
  testHospData,
  combinedStates,
}) => {
  const { groups, worstMetrics } = getGroups(state, testHospData)
  const status = getStateStatus(state, combinedStates)

  const gridClasses = {
    1: barChartStyle.one,
    2: barChartStyle.two,
    3: barChartStyle.three,
    4: barChartStyle.four,
  }

  const headers = availableMetrics
    .map(m => (m === 'hospitalizations' ? 'hosp.' : m)) // replace hospitalizations with hosp
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
      <div className={barChartStyle.innerWrapper}>
        <div
          className={classnames(
            barChartStyle.grid,
            gridClasses[availableMetrics.length],
            status.casesOnly && barChartStyle.casesOnly,
            status.deathsOnly && barChartStyle.deathsOnly,
          )}
        >
          {/* Spacer for CSS Grid */}
          <span />
          {headers.map((header, index) => (
            <span
              className={classnames(
                barChartStyle.barHeader,
                index !== 0 && barChartStyle.secondaryHeader,
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
