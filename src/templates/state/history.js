import React from 'react'
import { graphql } from 'gatsby'
import StateHistory from '~components/pages/state/state-history'

import Layout from '~components/layout'

const StatePage = ({ pageContext, data, path }) => {
  const state = pageContext
  const { allCovidStateDaily, allCovidScreenshot } = data
  const { slug } = state.childSlug
  return (
    <Layout
      title={state.name}
      path={path}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
    >
      <p>
        You can also{' '}
        <a href={`/data/download/${slug}-history.csv`}>
          download all state data as a CSV file
        </a>
        .
      </p>
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
