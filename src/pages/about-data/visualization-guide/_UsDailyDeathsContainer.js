import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BarChart from '../../../components/charts/bar-chart'
import { deathsBarColor, parseDate } from '../../../utilities/visualization'

import dashboardStyles from './dashboard.module.scss'

export default function UsAreaChartContainer() {
  const query = useStaticQuery(graphql`
    {
      allCovidUsDaily {
        nodes {
          date
          deathIncrease
        }
      }
    }
  `)
  const data = query.allCovidUsDaily.nodes
    .map(node => [
      {
        date: parseDate(node.date),
        label: 'Deaths',
        value: node.deathIncrease,
      },
    ])
    .reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => {
      if (a.date > b.date) return 1
      if (a.date < b.date) return -1
      return 0
    })

  return (
    <div
      className={`${dashboardStyles.chartsContainerInner} ${dashboardStyles.chartsContainerInnerLeft}`}
    >
      <h3 className={dashboardStyles.chartTitle}>Daily deaths in the US</h3>
      <div>
        <BarChart
          data={data}
          fill={deathsBarColor}
          height={400}
          marginBottom={40}
          marginLeft={80}
          marginRight={10}
          marginTop={10}
          xTicks={3}
          showTicks={6}
          width={400}
        />
      </div>
    </div>
  )
}
