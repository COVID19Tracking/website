import React from 'react'
import { graphql, Link } from 'gatsby'
import { FormatDate } from '~components/utils/format'
import Layout from '~components/layout/internal'
import Screenshots from '~components/pages/internal/state/screenshots'
import ApiPreview from '~components/pages/internal/state/api-preview'
import RawData from '~components/pages/internal/state/raw-data'

export default ({ pageContext, data }) => {
  console.log(data)
  const { covidStateInfo, allCovidScreenshot, covidStateDaily } = data
  const { date } = pageContext
  const screenshots = []
  allCovidScreenshot.nodes.forEach(screenshot => {
    if (parseInt(screenshot.date, 10) === date) {
      screenshots.push(screenshot)
    }
  })
  return (
    <Layout
      title={
        <>
          <Link to={`/internal/state/${covidStateInfo.state.toLowerCase()}`}>
            {covidStateInfo.name}
          </Link>{' '}
          - <FormatDate date={date} format="LLL d yyyy" timezone={false} />
        </>
      }
    >
      <RawData daily={covidStateDaily} />
      <Screenshots screenshots={screenshots} stateInfo={covidStateInfo} />
      <ApiPreview state={covidStateInfo.state} date={date} />
    </Layout>
  )
}

export const query = graphql`
  query($state: String!, $date: Int!) {
    covidStateInfo(state: { eq: $state }) {
      name
      state
      notes
      covid19Site
      covid19SiteSecondary
      twitter
    }
    covidStateDaily(state: { eq: $state }, date: { eq: $date }) {
      date
      totalTestResults
      positive
      pending
      negative
      hospitalized
      death
      commercialScore
      dataQualityGrade
      dateModified
      dateChecked
      state
      recovered
      posNeg
      onVentilatorCurrently
      onVentilatorCumulative
      lastUpdateEt
      inIcuCumulative
      inIcuCurrently
      hospitalizedCumulative
      hospitalizedCurrently
      fips
    }
    allCovidScreenshot(filter: { state: { eq: $state } }) {
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
