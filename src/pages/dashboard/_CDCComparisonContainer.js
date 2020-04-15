import { max, sum } from 'd3-array'
import { timeParse } from 'd3-time-format'
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import BarChart from './charts/_BarChart'
import { formatNumber, parseDate } from './_utils'

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
  const cdcCumulativeTotal = sum(cdcData, d => d.value)
  const cumulativeTotal = sum(data, d => d.value)
  const dailyMax = max(data, d => d.value)
  return (
    <section>
      <div>
        <h4>Differences between this data and the CDC data</h4>
        <p>
          As of today, the C.D.C. has tested {formatNumber(cdcCumulativeTotal)}{' '}
          specimens, and we have tracked at least{' '}
          {formatNumber(cumulativeTotal)} tests administered across the country.
          It is important to note that testing numbers are likely an undercount
          because of the lack of universal testing and state reporting, and that
          multiple specimen tests can be conducted from a single person&rsquo;s
          sample.
        </p>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, width: '50%' }}>
          <BarChart
            data={cdcData}
            fill="#585BC1"
            height={400}
            marginBottom={40}
            marginLeft={80}
            marginRight={10}
            marginTop={10}
            xTicks={2}
            width={400}
            yMax={dailyMax}
          />
        </div>
        <div style={{ flexGrow: 1, width: '50%' }}>
          <BarChart
            data={data}
            fill="#585BC1"
            height={400}
            marginBottom={40}
            marginLeft={80}
            marginRight={10}
            marginTop={10}
            xTicks={2}
            width={400}
          />
        </div>
      </div>
    </section>
  )
}
