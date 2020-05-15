import React from 'react'
import Layout from '../../components/layout'

import NoData from '~components/pages/race/dashboard/no-data'
import PercentageOverview from '~components/pages/race/dashboard/percentage-overview'
import HeaderSorter from '~components/pages/race/dashboard/header-sorter'
import States from '~components/pages/race/dashboard/states'
import StatesNotReporting from '~components/pages/race/dashboard/states-not-reporting'

export default () => (
  <Layout
    title="Racial Data dashboard"
    description="The COVID-19 pandemic isn’t affecting all communities the same way. The COVID Racial Data Dashboard helps us track this inequity by publishing topline racial data compared with state demographic data."
  >
    <NoData stateName="North Dakota" />
    <StatesNotReporting
      stateNames={['Colorado', 'North Dakota', 'South Carolina']}
    />
    <PercentageOverview
      stateName="Colorado"
      ethnicityCasePercent={12.3}
      ethnicityDeathPercent={78.4}
      raceCasePercent={67.3}
    />
    <PercentageOverview stateName="Colorado" />
    <PercentageOverview
      stateName="Colorado"
      raceCasePercent={67.3}
      raceDeathPercent={22.9}
    />
    <PercentageOverview
      stateName="Maryland"
      combinedRaceEthnicityDeathPercent={44.3}
      combinedRaceEthnicityCasePercent={47.8}
    />
    <HeaderSorter stateName="California" stateReports="race" />
    <States />
  </Layout>
)
