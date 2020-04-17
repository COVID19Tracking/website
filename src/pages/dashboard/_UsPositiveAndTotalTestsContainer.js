import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { format } from 'd3-format'

import AreaChart from '../../components/charts/area-chart'
import {
  parseDate,
  totalColor,
  positiveColor,
} from '../../utilities/visualization'

export default function UsAreaChartContainer() {
  const data = useStaticQuery(graphql`
    {
      allCovidUsDaily {
        nodes {
          totalTestResults
          positive
          date
        }
      }
    }
  `)
  const transformedData = useMemo(() => {
    return data.allCovidUsDaily.nodes
      .map(node => [
        {
          date: parseDate(node.date),
          label: 'Total',
          value: node.totalTestResults,
        },
        { date: parseDate(node.date), label: 'Positive', value: node.positive },
      ])
      .reduce((acc, val) => acc.concat(val), [])
  }, [data.allCovidUsDaily.nodes.length])
  return (
    <section>
      <div style={{ width: '50%', align: 'center', margin: 'auto' }}>
        <h4>Positive tests and total tests in the US</h4>
        <ul className="chart-legend">
          <li>
            <div
              className="chart-legend-color"
              style={{ backgroundColor: positiveColor }}
            />
            <div>Positive tests</div>
          </li>
          <li>
            <div
              className="chart-legend-color"
              style={{ backgroundColor: totalColor }}
            />
            <div>Total tests</div>
          </li>
        </ul>
        <AreaChart
          data={transformedData}
          fill={d => {
            if (d === 'Total') return totalColor
            return positiveColor
          }}
          height={300}
          labelOrder={['Total', 'Positive']}
          marginBottom={40}
          marginLeft={80}
          marginRight={10}
          marginTop={10}
          xTicks={2}
          width={400}
          yFormat={format('~s')}
        />
      </div>
    </section>
  )
}
