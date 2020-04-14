import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { format } from 'd3-format'

import AreaChart from './charts/_AreaChart'
import { parseDate } from './_utils'

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
      <p>
        Testing is one of the most important tools in controlling an outbreak.
        When universal testing is implemented, people who are infected with the
        virus can be isolated from folks who test negative. This functions as a
        sort of targeted social distancing technique and can help slow the
        outbreak.
      </p>
      <div>
        <h4>Positive tests and total tests in the US</h4>
        <AreaChart
          data={transformedData}
          fill={d => {
            if (d === 'Total') return '#585BC1'
            return '#FFA270'
          }}
          height={400}
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
