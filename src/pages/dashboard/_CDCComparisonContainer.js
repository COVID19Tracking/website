import { max, sum } from 'd3-array'
import { format } from 'd3-format'
import { timeParse } from 'd3-time-format'
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import BarChart from './charts/_BarChart'
import { parseDate } from './_utils'

const parseCdcDate = timeParse('%m/%d/%Y')

const sortChronologically = (a, b) => {
  if (a.date > b.date) return 1
  if (a.date < b.date) return -1
  return 0
}

export default function CDCComparisonContainer() {
  const query = useStaticQuery(graphql`
    {
      allCovidUsDaily {
        nodes {
          date
          totalTestResultsIncrease
        }
      }
      allCdcDaily {
        nodes {
          dateCollected
          lag
          cdcLabs
          dailyTotal
        }
      }
    }
  `)
  const cdcData = query.allCdcDaily.nodes
    .map(node => {
      const date = parseCdcDate(`${node.dateCollected}/2020`)
      return {
        date,
        value: +node.dailyTotal,
      }
    })
    .sort(sortChronologically)
  const data = query.allCovidUsDaily.nodes
    .map(node => ({
      date: parseDate(node.date),
      value: node.totalTestResultsIncrease,
    }))
    .reduce((acc, val) => acc.concat(val), [])
    .sort(sortChronologically)
  // const cdcCumulativeTotal = sum(cdcData, d => d.value)
  const cumulativeTotal = sum(data, d => d.value)
  const dailyMax = max(data, d => d.value)
  return (
    <section>
      <div>
        <p>
          As of today, the COVID Tracking Project has identified more than{' '}
          {format('.2s')(cumulativeTotal).replace('M', ' million')} tests
          administered across the country, a count significantly higher than the
          numbers the CDC reports. That’s because the CDC tallies only COVID-19
          tests done at certified public health labs, and leaves out those
          conducted by private labs—the vast majority of all tests to date.
        </p>
        <p>
          The COVID Tracking Project provides more complete information. We
          collect the best available data from every US state and territory
          about the number of people tested for COVID-19 including both public
          and private labs. We update our dataset multiple times every day based
          on the latest reports.
        </p>
        <h4>Daily new tests in the US</h4>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, width: '50%', marginRight: 20 }}>
          <strong>CDC</strong>
          <BarChart
            data={cdcData}
            fill="#585BC1"
            height={252}
            marginBottom={40}
            marginLeft={80}
            marginRight={10}
            marginTop={10}
            xTicks={2}
            width={252}
            align="right"
            yMax={dailyMax}
            showTicks={2}
          />
        </div>
        <div style={{ flexGrow: 1, width: '50%', marginLeft: 20 }}>
          <strong>The Covid Tracking Project</strong>
          <BarChart
            data={data}
            fill="#585BC1"
            height={252}
            marginBottom={40}
            marginLeft={80}
            marginRight={10}
            marginTop={10}
            xTicks={2}
            width={252}
            align="left"
            showTicks={5}
          />
        </div>
      </div>
      <p>
        <strong>Note:</strong> Numbers undercount the full extent of COVID-19
        because of the lack of widespread testing and lags in state reporting.
      </p>
    </section>
  )
}
