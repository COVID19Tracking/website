import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import StateNav from '~components/common/state-nav'
import Hero from '~components/pages/race/dashboard/hero'
import States from '~components/pages/race/dashboard/states'
import UsOverview from '~components/pages/race/dashboard/us-overview'

export default ({ data }) => {
  const stateList = []
  data.allCovidRaceDataSeparate.nodes.forEach(state => {
    stateList.push(state)
  })
  data.allCovidRaceDataCombined.nodes.forEach(state => {
    stateList.push(state)
  })
  return (
    <Layout
      title="Racial Data Dashboard"
      description="The COVID-19 pandemic isn’t affecting all communities the same way. The COVID Racial Data Dashboard helps us track this inequity by publishing topline racial data compared with state demographic data."
      returnLink="/race"
      returnLinkTitle="Racial Data Tracker"
      path="/race/dashboard"
    >
      <Hero
        ledeContent={
          data.allContentfulSnippet.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html
        }
      />
      <UsOverview
        statesCasesCount={data.covidRaceDataHomepage.statesReportingCases}
        statesDeathsCount={data.covidRaceDataHomepage.statesReportingDeaths}
        statesNotReporting={['Colorado', 'North Dakota', 'South Carolina']}
      />
      <StateNav
        title="Race and ethnicity data by state"
        stateList={stateList.sort((a, b) => (a.name < b.name ? -1 : 1))}
      />
      <States />
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "race-hero-lede" } }) {
      edges {
        node {
          childContentfulSnippetContentTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allCovidRaceDataSeparate {
      nodes {
        name: stateName
        state
      }
    }
    allCovidRaceDataCombined {
      nodes {
        name: stateName
        state
      }
    }
    covidRaceDataHomepage {
      statesReportingCases
      statesReportingDeaths
    }
  }
`
