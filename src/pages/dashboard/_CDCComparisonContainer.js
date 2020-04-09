import { sum } from 'd3-array'
import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import BarChart from './charts/_BarChart'
import { calculateTotal, formatNumber, parseDate } from './_utils'

export default function CDCComparisonContainer() {
  const query = useStaticQuery(graphql`
    {
      allCovidUsDaily {
        nodes {
          date
          positive
          negative
        }
      }
    }
  `)
  const data = useMemo(() => {
    const nodes = query.allCovidUsDaily.nodes
      .map(node => [
        {
          date: parseDate(node.date),
          value: calculateTotal(node),
        },
      ])
      .flat()

    return nodes.sort((a, b) => {
      if (a.date > b.date) return 1
      if (a.date < b.date) return -1
      return 0
    })
  }, [query.allCovidUsDaily.nodes.length])
  const cumulativeTotal = sum(data, d => d.value)
  return (
    <section style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, width: '50%' }}>
        <h4>Differences between this data and the CDC data</h4>
        <p>
          As of today, the C.D.C. has tested 133,442 specimens, and we have
          tracked at least {formatNumber(cumulativeTotal)} tests administered
          across the country. It is important to note that testing numbers are
          likely an undercount because of the lack of universal testing and
          state reporting, and that multiple specimen tests can be conducted
          from a single person’s sample.
        </p>
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
          width={200}
        />
      </div>
    </section>
  )
}
