import { json } from 'd3-fetch'
import { timeParse } from 'd3-time-format'

import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import AreaChart from './_AreaChart'
// import Map from './_Map'

const parseDate = timeParse('%Y%m%d')

function calculateTotal(d) {
  return d.positive + (d.negative || 0)
}

function transformUsDaily(data) {
  return data
    .map(d => {
      const date = parseDate(d.date)
      return [
        {
          date,
          label: 'Total',
          value: calculateTotal(d),
        },
        {
          date,
          label: 'Positive',
          value: d.positive,
        },
      ]
    })
    .flat()
}

const DashboardPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const usDaily = await json('https://covidtracking.com/api/us/daily')
      const sortedUsDaily = usDaily.sort(function sortByDate(a, b) {
        const aDate = parseDate(a.date)
        const bDate = parseDate(b.date)

        return aDate - bDate
      })
      const transformed = transformUsDaily(sortedUsDaily)
      setData(transformed)
    }
    fetchData()
  }, [])

  return (
    <Layout title="Visual Dashboard">
      <p>Test</p>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <AreaChart
        data={data}
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
      {/* <Map /> */}
    </Layout>
  )
}

export default DashboardPage
