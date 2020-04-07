import { max } from 'd3-array'
import React, { useMemo } from 'react'

import AreaChart from './_AreaChart'

import {
  calculateTotal,
  getStateName,
  parseDate,
  totalColor,
  positiveColor,
} from './_util'

import './dashboard.scss'

const SmallMultiplesAreaCharts = ({ data }) => {
  const secondMaxTotal = useMemo(() => {
    if (!data[1] && !data[0]) return
    // eslint-disable-next-line consistent-return
    return max(data[1].values, d => calculateTotal(d))
  }, [data.length])
  return (
    <div>
      <p>
        By comparing the positive tests to the total tests in each state, we can
        get a sense of how widespread a state’s testing regime might be (though
        always remember to consider population densities vary wildly across the
        country) and if the number of positive tests is tracking roughly against
        the total number of tests. If it is, then we might consider that the
        state isn’t necessarily just getting new infections every day but that
        they’re also giving more tests.
      </p>
      <h3>Cumulative tests by state</h3>
      <ul className="chart-legend">
        <li>
          <span
            className="chart-legend-color"
            style={{ backgroundColor: positiveColor }}
          />
          Positive tests
        </li>
        <li>
          <span
            className="chart-legend-color"
            style={{ backgroundColor: totalColor }}
          />{' '}
          Total tests
        </li>
        <li>
          <span
            className="chart-legend-stay-at-home"
            style={{ backgroundColor: 'black', width: '2px' }}
          />
          Date the statewide stay-at-home order was implemented.
        </li>
      </ul>
      <div className="small-multiples-chart-container">
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
              value: calculateTotal(d),
            })
          })

          return (
            <div
              className="small-multiples-chart"
              data-state={state.key}
              key={state.key}
            >
              <h4>{stateName}</h4>
              <AreaChart
                data={stateData}
                fill={d => {
                  if (d === 'Total') return '#585BC1'
                  return '#FFA270'
                }}
                height={250}
                labelOrder={['Total', 'Positive']}
                marginBottom={40}
                marginLeft={80}
                marginRight={10}
                marginTop={10}
                xTicks={2}
                width={250}
                yMax={secondMaxTotal}
                yTicks={2}
              />
              <p>
                <a
                  href={`/data/state/${stateName
                    .toLowerCase()
                    .replace(/\s/g, '-')}`}
                >
                  See all data from state
                </a>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SmallMultiplesAreaCharts
