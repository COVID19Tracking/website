import React from 'react'
import { graphql } from 'gatsby'
import StateHistory from '~components/pages/state/state-history'

import Layout from '~components/layout'

const StatePage = ({ pageContext, data, path }) => {
  const state = pageContext
  const { allCovidStateDaily, allCovidScreenshot } = data
  return (
    <Layout title={state.name} returnLink="/data" path={path}>
      <StateHistory
        history={allCovidStateDaily.nodes}
        screenshots={allCovidScreenshot.nodes}
      />
    </Layout>
  )
}

export default StatePage

export const query = graphql`
  query($state: String!) {
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        totalTestResults
        totalTestResultsIncrease
        positive
        positiveIncrease
        pending
        negative
        hospitalized
        hospitalizedCurrently
        hospitalizedIncrease
        death
        deathIncrease
        date
        childPopulation {
          deathIncrease {
            percent
          }
          hospitalizedCurrently {
            percent
          }
          positiveIncrease {
            percent
          }
          totalTestResultsIncrease {
            percent
          }
        }
      }
    }
    allCovidScreenshot(
      filter: {
        state: { eq: $state }
        secondary: { eq: false }
        tertiary: { eq: false }
      }
      sort: { fields: dateChecked }
    ) {
      nodes {
        size
        url
        state
        date
        dateChecked
      }
    }
  }
`
