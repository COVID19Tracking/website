import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
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
      returnLink="/race"
      returnLinkTitle="Racial Data Tracker"
      path="/race/dashboard"
      socialCard={data.contentfulSocialCard}
    >
      <Hero
        ledeContent={
          data.raceHeroSnippet.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
      />
      <UsOverview
        statesCasesCount={data.covidRaceDataHomepage.statesReportingCases}
        statesDeathsCount={data.covidRaceDataHomepage.statesReportingDeaths}
        statesNotReporting={
          data.noDataSnippet.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
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
    raceHeroSnippet: contentfulSnippet(slug: { eq: "race-hero-lede" }) {
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    contentfulSocialCard(slug: { eq: "racial-data-tracker" }) {
      description {
        description
      }
      image {
        resize(width: 1200) {
          src
        }
      }
    }
    noDataSnippet: contentfulSnippet(slug: { eq: "race-dashboard-no-data" }) {
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
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
    allCovidStateInfo {
      nodes {
        state
        name
      }
    }
  }
`
