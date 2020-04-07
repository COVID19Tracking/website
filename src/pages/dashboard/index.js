import { nest } from 'd3-collection'
import { json } from 'd3-fetch'

import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import AreaChart from './_AreaChart'
import SmallMultiplesAreaCharts from './_SmallMultiplesAreaCharts'
import MapContainer from './_MapContainer'

import { calculateTotal, parseDate } from './_util'

import './dashboard.scss'

function groupAndSortStateDaily(data) {
  const grouped = nest()
    .key(d => d.state)
    .entries(data)

  return grouped.sort((a, b) => {
    const lastA = a.values[0]
    const lastB = b.values[0]

    const lastATotal = calculateTotal(lastA)
    const lastBTotal = calculateTotal(lastB)
    return lastBTotal - lastATotal
  })
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
  const [usDaily, setUsDaily] = useState([])
  const [stateDaily, setStateDaily] = useState([])

  useEffect(() => {
    async function fetchData() {
      const usDailyReq = await json('https://covidtracking.com/api/us/daily')
      const stateDailyReq = await json(
        'https://covidtracking.com/api/v1/states/daily.json',
      )
      const sortedUsDaily = usDailyReq.sort(function sortByDate(a, b) {
        const aDate = parseDate(a.date)
        const bDate = parseDate(b.date)

        return aDate - bDate
      })

      setUsDaily(transformUsDaily(sortedUsDaily))
      setStateDaily(groupAndSortStateDaily(stateDailyReq))
    }
    fetchData()
  }, [])

  return (
    <Layout title="Visual Dashboard">
      <AreaChart
        data={usDaily}
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
      <MapContainer />
      <SmallMultiplesAreaCharts data={stateDaily} />
    </Layout>
  )
}

export default DashboardPage
