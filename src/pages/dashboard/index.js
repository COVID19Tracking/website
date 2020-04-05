/* eslint-disable */

import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import AreaChart from './AreaChart'
// import Map from './_Map'

// this is the entry point component for the dashboard page and should only render imported components
const DashboardPage = () => {
  return (
    <Layout title="Visual Dashboard">
      <AreaChart />
      {/* <Map /> */}
    </Layout>
  )
}

export default DashboardPage