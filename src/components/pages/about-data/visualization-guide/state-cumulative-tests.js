import { extent } from 'd3-array'
import { nest } from 'd3-collection'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'

import AreaChart from '~components/charts/area-chart'
import TotalAndPositiveLegend from './total-positive-legend'
import StatesWithPopulation from '~data/visualization/state-populations.json'

import {
  getStateName,
  parseDate,
  totalColor,
  positiveColor,
} from '~utilities/visualization'

import './dashboard.scss'
import dashboardStyles from './dashboard.module.scss'

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
      const ONE_MILLION = 1000000
      // divide by population to determine per capita percentages
      clonedValue.positive = (clonedValue.positive / population) * ONE_MILLION
      clonedValue.negative = (clonedValue.negative / population) * ONE_MILLION
      clonedValue.totalTestResults =
        (clonedValue.totalTestResults / population) * ONE_MILLION
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
            date(formatString: "YYYYMMDD")
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
      <h3 className={dashboardStyles.chartTitle}>Cumulative tests by state</h3>
      <div className="chart-header">
        <div className="dashboard-toggle-wrapper">
          <div className="dashboard-toggle-label">Display by:</div>
          <div
            className="dashboard-toggle"
            onClick={toggleChartData}
            onKeyPress={toggleChartData}
            role="switch"
            aria-checked={useTestsPerCapita}
            tabIndex={0}
          >
            <span className={useTestsPerCapita ? '' : 'active'}>
              Total tests
            </span>
            <span className={useTestsPerCapita ? 'active' : ''}>
              Tests per capita*
            </span>
          </div>
        </div>
        <ul className="chart-legend" aria-hidden="true">
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
                <h4>
                  <span className="small-multiples-chart-state-name">
                    {stateName}
                  </span>
                </h4>
              </a>
              <AreaChart
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
                focusable={false}
                dateExtent={dateExtent}
                renderTooltipContents={d => (
                  <TotalAndPositiveLegend
                    date={d.date}
                    total={d.Total}
                    positive={d.Positive}
                    perCapita={useTestsPerCapita}
                  />
                )}
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
        <b>*</b> Per capita = per one million people
      </p>
    </div>
  )
}
