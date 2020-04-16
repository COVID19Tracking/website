import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BarChart from '../../components/charts/bar-chart'
import { parseDate } from '../../utilities/visualization'

import dashboardStyles from './dashboard.module.scss'

export default function UsAreaChartContainer() {
  const query = useStaticQuery(graphql`
    {
      allCovidUsDaily {
        nodes {
          date
          death
        }
      }
    }
  `)
  const data = query.allCovidUsDaily.nodes
    .map(node => [
      {
        date: parseDate(node.date),
        label: 'Deaths',
        value: node.death,
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
      <h3 className={dashboardStyles.chartTitle}>Total deaths in the US</h3>
      <BarChart
        data={data}
        fill="#585BC1"
        height={400}
        marginBottom={40}
        marginLeft={80}
        marginRight={10}
        marginTop={10}
        xTicks={3}
        width={400}
        showTicks={5}
      />
    </div>
  )
}
