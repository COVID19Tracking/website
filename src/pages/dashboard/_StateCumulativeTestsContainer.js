import { extent } from 'd3-array'
import { nest } from 'd3-collection'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'

import AreaChart from '../../components/charts/area-chart'

import StatesWithPopulation from '../../data/visualization/state-populations.json'

import {
  getStateName,
  parseDate,
  totalColor,
  positiveColor,
} from '../../utilities/visualization'

import './dashboard.scss'
import dashboardStyles from './dashboard.module.scss'

// these come from this google spreadsheet owned by Júlia Ledur
// https://docs.google.com/spreadsheets/d/1mD_NhlJR1fM2Pv_pY8YixUrX2p2F8rAE0xPTtsTJOiM/edit#gid=0
const stayAtHomeOrders = {
  AK: 20200328,
  AZ: 20200331,
  CA: 20200319,
  CO: 20200326,
  CT: 20200323,
  DC: 20200401,
  DE: 20200324,
  FL: 20200403,
  GA: 20200403,
  HI: 20200325,
  ID: 20200325,
  IL: 20200321,
  IN: 20200324,
  KS: 20200330,
  KY: 20200326,
  LA: 20200323,
  MA: 20200324,
  MD: 20200330,
  ME: 20200402,
  MI: 20200324,
  MN: 20200327,
  MO: 20200406,
  MS: 20200403,
  MT: 20200328,
  NC: 20200330,
  NH: 20200327,
  NJ: 20200321,
  NM: 20200324,
  NV: 20200401,
  NY: 20200322,
  OH: 20200323,
  OR: 20200323,
  PA: 20200401,
  PR: 20200315,
  RI: 20200328,
  SC: 20200407,
  TN: 20200331,
  TX: 20200402,
  VA: 20200330,
  VI: 20200321,
  VT: 20200325,
  WA: 20200323,
  WV: 20200324,
  WI: 20200325,
}

const statePopulations = StatesWithPopulation.features.reduce((acc, cur) => {
  acc[cur.properties.STUSPS] = cur.properties.population
  return acc
}, {})

const territoryPopulations = {
  GU: 164229,
  VI: 107268,
  MP: 55144,
  AS: 55641,
}

function sortGroupedData(groupedData) {
  return groupedData.sort((a, b) => {
    return b.values[0].totalTestResults - a.values[0].totalTestResults
  })
}

function groupAndSortStateDaily(query) {
  const data = query.allCovidStateDaily.edges.map(edge => {
    const { node } = edge
    return node
  })

  const grouped = nest()
    .key(d => d.state)
    .sortValues((a, b) => {
      const aDate = parseDate(a.date)
      const bDate = parseDate(b.date)

      if (aDate > bDate) return -1
      if (bDate > aDate) return 1
      return 0
    })
    .entries(data)

  const groupedPerCapita = grouped.map(stateData => {
    const population = statePopulations[stateData.key]
      ? statePopulations[stateData.key]
      : territoryPopulations[stateData.key]
    const clonedData = cloneDeep(stateData)

    clonedData.values = clonedData.values.map(value => {
      const clonedValue = cloneDeep(value)

      // divide by population to determine per capita percentages
      clonedValue.positive /= population
      clonedValue.negative /= population
      clonedValue.totalTestResults /= population

      return clonedValue
    })

    return clonedData
  })

  return {
    totals: sortGroupedData(grouped),
    perCapita: sortGroupedData(groupedPerCapita),
  }
}

// TODO: we're iterating over data and calling parseDate multiple times in this
// component. Seems like it could be optimized.
function getDateExtent(data) {
  const allValues = data.reduce((acc, cur) => {
    return acc.concat(cur.values)
  }, [])

  return extent(allValues, v => parseDate(v.date))
}

export default function CumulativeTestsByStateContainer() {
  const query = useStaticQuery(graphql`
    {
      allCovidStateDaily {
        edges {
          node {
            date
            state
            positive
            negative
            totalTestResults
          }
        }
      }
    }
  `)

  const [useTestsPerCapita, setUseTestsPerCapita] = useState(false)

  const toggleChartData = () => setUseTestsPerCapita(u => !u)

  const allData = useMemo(() => groupAndSortStateDaily(query), [query])

  const data = useMemo(() => {
    return useTestsPerCapita ? allData.perCapita : allData.totals
  }, [useTestsPerCapita])

  const maxStateTests = useMemo(() => {
    return data[0].values[0].totalTestResults
  }, [useTestsPerCapita])

  const dateExtent = useMemo(() => {
    return getDateExtent(allData.totals)
  }, [allData.totals])

  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleChartsCollapsed = () => setIsCollapsed(i => !i)

  return (
    <div className="dashboard-cumulative-tests">
      <p>
        By comparing the positive tests to the total tests in each state, we can
        get a sense of how widespread a state&rsquo;s testing regime might be
        (though always remember to consider population densities vary wildly
        across the country) and if the number of positive tests is tracking
        roughly against the total number of tests. If it is, then we might
        consider that the state isn&rsquo;t necessarily just getting new
        infections every day but that they&rsquo;re also giving more tests.
      </p>
      <h3 className={dashboardStyles.chartTitle}>Cumulative tests by state</h3>
      <div className="chart-header">
        <div
          className="dashboard-toggle"
          onClick={toggleChartData}
          onKeyPress={toggleChartData}
          role="switch"
          aria-checked={useTestsPerCapita}
          tabIndex={0}
        >
          <span className={useTestsPerCapita ? '' : 'active'}>Total Tests</span>
          <span className={useTestsPerCapita ? 'active' : ''}>
            Tests Per Capita
          </span>
        </div>
        <ul className="chart-legend">
          <li>
            <div
              className="chart-legend-color"
              style={{ backgroundColor: positiveColor }}
            />
            <div>Positive tests {useTestsPerCapita && ' per capita'}</div>
          </li>
          <li>
            <div
              className="chart-legend-color"
              style={{ backgroundColor: totalColor }}
            />
            <div>Total tests {useTestsPerCapita && ' per capita'}</div>
          </li>
          <li>
            <div className="chart-legend-color chart-legend-stay-at-home" />
            <div>Stay-at-home order*</div>
          </li>
        </ul>
      </div>
      <div
        className={[
          'small-multiples-chart-container',
          isCollapsed ? 'small-multiples-chart-container--collapsed' : '',
        ].join(' ')}
      >
        {data.map(state => {
          // because we're just charting two variables we make them here
          // we do this instead of creating two different area chart generators
          const stateData = []
          const stateName = getStateName(state.key)
          const stayAtHomeOrder = stayAtHomeOrders[state.key]
          const annotations = stayAtHomeOrder
            ? [{ date: parseDate(stayAtHomeOrder) }]
            : null

          state.values.forEach(d => {
            const date = parseDate(d.date)

            stateData.push({
              date,
              label: 'Positive',
              value: d.positive,
            })

            stateData.push({
              date,
              label: 'Total',
              value: d.totalTestResults,
            })
          })

          return (
            <div
              className="small-multiples-chart"
              data-state={state.key}
              key={state.key}
            >
              <a
                className="small-multiples-chart__see-all-link"
                href={`/data/state/${stateName
                  .toLowerCase()
                  .replace(/\s/g, '-')}`}
              >
                <h4>{stateName}</h4>
              </a>
              <AreaChart
                annotations={annotations}
                data={stateData}
                fill={d => {
                  if (d === 'Total') return totalColor
                  return positiveColor
                }}
                height={500}
                labelOrder={['Total', 'Positive']}
                marginTop={10}
                xTicks={4}
                width={750}
                yMax={maxStateTests}
                yTicks={2}
                showTicks={false}
                dateExtent={dateExtent}
              />
              <p />
            </div>
          )
        })}
      </div>
      <button
        className="chart-expand-button small-multiples-chart-collapse-button"
        type="button"
        onClick={toggleChartsCollapsed}
      >
        Show {isCollapsed ? 'all' : 'less'} states
      </button>
      <p className="chart-legend-note">
        <b>*</b> Only statewide stay-at-home orders are included; dates mark
        when the orders went into effect.
      </p>
    </div>
  )
}
