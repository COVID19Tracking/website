import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'

import LongContent from '~components/common/long-content'
import StateNavWrapper from '~components/common/state-nav-wrapper'

import States from '~components/pages/race/dashboard/states'
import UsOverview from '~components/pages/race/dashboard/us-overview'
import Preamble from '~components/pages/race/dashboard/preamble'

const RaceDashboardPage = ({ data }) => {
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
      returnLinks={[{ link: '/race', title: 'Racial Data Tracker' }]}
      path="/race/dashboard"
      socialCard={data.contentfulSocialCard}
    >
      <LongContent>
        <Preamble
          raceHeroSnippetHtml={
            data.raceHeroSnippet.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
        />
        <UsOverview
          statesCasesCount={data.covidRaceDataHomepage.statesReportingCases}
          statesDeathsCount={data.covidRaceDataHomepage.statesReportingDeaths}
        />
      </LongContent>
      <StateNavWrapper
        title="Race and Ethnicity Data by State"
        stateList={stateList}
      >
        <States />
      </StateNavWrapper>
    </Layout>
  )
}

export default RaceDashboardPage

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
    allCovidRaceDataSeparate {
      nodes {
        name
        state
      }
    }
    allCovidRaceDataCombined {
      nodes {
        name
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
