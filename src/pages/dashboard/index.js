import { nest } from 'd3-collection'
import { json } from 'd3-fetch'

import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import SmallMultiplesAreaCharts from './_SmallMultiplesAreaCharts'
import MapContainer from './_MapContainer'

import UsAreaChartContainer from './_UsAreaChartContainer'
import { calculateTotal } from './_util'

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

const DashboardPage = () => {
  const [stateDaily, setStateDaily] = useState([])

  useEffect(() => {
    async function fetchData() {
      const stateDailyReq = await json(
        'https://covidtracking.com/api/v1/states/daily.json',
      )

      setStateDaily(groupAndSortStateDaily(stateDailyReq))
    }
    fetchData()
  }, [])

  return (
    <Layout title="Visual Dashboard">
      <UsAreaChartContainer />
      <MapContainer />
      <SmallMultiplesAreaCharts data={stateDaily} />
    </Layout>
  )
}

export default DashboardPage
