import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'

import NoData from '~components/pages/race/no-data'
import PercentageOverview from '~components/pages/race/percentage-overview'

export default ({ data }) => (
  <Layout
    title="Racial Data dashboard"
    description="The COVID-19 pandemic isn’t affecting all communities the same way. The COVID Racial Data Dashboard helps us track this inequity by publishing topline racial data compared with state demographic data."
  >
    <NoData stateName="North Dakota" />
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
    {data.allCovidStateInfo.edges.map(({ node }) => (
      <h3>{node.name}</h3>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allCovidStateInfo(sort: { fields: name }) {
      edges {
        node {
          name
          state
        }
      }
    }
  }
`
