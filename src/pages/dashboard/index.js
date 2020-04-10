import React from 'react'
import Layout from '../../components/layout'
import CDCComparisonContainer from './_CDCComparisonContainer'
import MapContainer from './_MapContainer'
import StateCumulativeTestsContainer from './_StateCumulativeTestsContainer'
import StateTotalDeathsContainer from './_StateTotalDeathsContainer'
import StateCumulativeDeathsContainer from './_StateCumulativeDeathsContainer'
import UsCumulativeDeathsContainer from './_UsCumulativeDeathsContainer'
import UsPositiveAndTotalTestsContainer from './_UsPositiveAndTotalTestsContainer'

import './dashboard.scss'

const DashboardPage = () => {
  return (
    <Layout title="Visual Dashboard">
      <p>
        Tracking testing data has become crucial to fight the coronavirus.
        Considering the lag in data reports by public organizations, The COVID
        Tracking Project has been collecting more accurate information since
        March 4. On this dashboard, we present some of our data visualized and
        walk you through the most common misconceptions when charting
        coronavirus numbers.
      </p>
      <CDCComparisonContainer />
      <MapContainer />
      <UsPositiveAndTotalTestsContainer />
      <UsCumulativeDeathsContainer />
      <StateCumulativeDeathsContainer />
      <StateTotalDeathsContainer />
      <StateCumulativeTestsContainer />
    </Layout>
  )
}

export default DashboardPage
