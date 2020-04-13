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
      <p>
        <strong>Note:</strong> We derive the total value by adding together the
        positive and negative value for each state. This is to account for
        differences in how states reporting pending tests; California has been
        inconsistent in its timing of reporting. We used faster updating sources
        until April 1, when we standardized on{' '}
        <a href="https://public.tableau.com/views/COVID-19PublicDashboard/Covid-19Public?:embed=y&:display_count=no&:showVizHome=no">
          California&apos;s new data dashboards
        </a>
        . This led to a drop in cases and deaths, as the state’s data lags some
        other sources.
      </p>
      <p>
        <strong>Source:</strong> The COVID Tracking Project
      </p>
      <p>
        By Daniel Gilbert,
        <a href="https://gabeoleary.com/">Gabe O&apos;Leary</a>, Jeremia
        Kimelman, <a href="https://julialedur.com.br/">Júlia Ledur</a> and Melba
        Madrigal.
      </p>
    </Layout>
  )
}

export default DashboardPage
