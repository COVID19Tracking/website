import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import AreaChart from './charts/_AreaChart'
import { parseDate } from './_util'

export default function UsAreaChartContainer() {
  const transformData = data => {
    const transformedData = data.allCovidUsDaily.edges
      .map(({ node }) => [
        {
          date: parseDate(node.date),
          label: 'Total',
          value: node.totalTestResults,
        },
        { date: parseDate(node.date), label: 'Positive', value: node.positive },
      ])
      .flat()
    return transformedData
  }
  const data = useStaticQuery(graphql`
    {
      allCovidUsDaily {
        edges {
          node {
            totalTestResults
            positive
            date
          }
        }
      }
    }
  `)
  return (
    <AreaChart
      data={transformData(data)}
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
  )
}
