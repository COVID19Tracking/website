import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import Layout from '~components/layout/internal'
import StateGrade from '~components/pages/state/state-grade'
import StateLinks from '~components/pages/state/state-links'
import InternalStateHistory from '~components/pages/internal/state/history'

export default ({ data }) => {
  const {
    covidStateInfo,
    covidState,
    allCovidStateDaily,
    allCovidScreenshot,
  } = data
  const screenshots = {}
  allCovidScreenshot.nodes.forEach(screenshot => {
    if (typeof screenshots[screenshot.date] === 'undefined') {
      screenshots[screenshot.date] = []
    }
    screenshots[screenshot.date].push(screenshot)
  })
  return (
    <Layout title={covidStateInfo.name}>
      <StateLinks {...covidStateInfo} />
      <StateGrade letterGrade={covidState.dataQualityGrade} />
      {covidStateInfo.notes && (
        <div
          className="module-content"
          dangerouslySetInnerHTML={{
            __html: marked(covidStateInfo.notes),
          }}
        />
      )}
      <InternalStateHistory
        state={covidStateInfo}
        history={allCovidStateDaily.nodes}
        screenshots={screenshots}
      />
    </Layout>
  )
}

export const query = graphql`
  query($state: String!) {
    covidStateInfo(state: { eq: $state }) {
      name
      state
      notes
      covid19Site
      covid19SiteSecondary
      twitter
    }
    covidState(state: { eq: $state }) {
      positive
      negative
      pending
      hospitalizedCurrently
      hospitalizedCumulative
      inIcuCurrently
      inIcuCumulative
      recovered
      onVentilatorCurrently
      onVentilatorCumulative
      death
      totalTestResults
      dateModified
      dataQualityGrade
    }
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        totalTestResults
        totalTestResultsIncrease
        positive
        pending
        negative
        hospitalized
        death
        date
      }
    }
    allCovidScreenshot(
      filter: { state: { eq: $state } }
      sort: { fields: dateChecked }
    ) {
      nodes {
        size
        url
        state
        date
        secondary
        dateChecked
      }
    }
  }
`
