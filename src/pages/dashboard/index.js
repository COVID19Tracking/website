import React from 'react'
import Layout from '../../components/layout'
import MapContainer from './_MapContainer'
import SmallMultiplesContainer from './_SmallMultiplesContainer'
import UsAreaChartContainer from './_UsAreaChartContainer'

import './dashboard.scss'

const DashboardPage = () => {
  return (
    <Layout title="Visual Dashboard">
      <UsAreaChartContainer />
      <MapContainer />
      <SmallMultiplesContainer />
    </Layout>
  )
}

export default DashboardPage
