import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
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
      .flat()
  }, [data.allCovidUsDaily.nodes.length])
  return (
    <section style={{ display: 'flex' }}>
      <p style={{ flexGrow: 1, width: '50%' }}>
        Testing is one of the most important tools in controlling an outbreak.
        When universal testing is implemented, people who are infected with the
        virus can be isolated from folks who test negative. This functions as a
        sort of targeted social distancing technique and can help slow the
        outbreak.
      </p>
      <div style={{ flexGrow: 1, width: '50%' }}>
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
        />
      </div>
    </section>
  )
}
