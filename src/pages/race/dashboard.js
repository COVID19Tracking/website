import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'

import Hero from '~components/pages/race/dashboard/hero'
import HeaderSorter from '~components/pages/race/dashboard/header-sorter'
import NoData from '~components/pages/race/dashboard/no-data'
import States from '~components/pages/race/dashboard/states'
import UsOverview from '~components/pages/race/dashboard/us-overview'

export default ({ data }) => (
  <Layout
    title="Racial Data Dashboard"
    description="The COVID-19 pandemic isn’t affecting all communities the same way. The COVID Racial Data Dashboard helps us track this inequity by publishing topline racial data compared with state demographic data."
  >
    <Hero
      ledeContent={
        data.allContentfulSnippet.edges[0].node
          .childContentfulSnippetContentTextNode.childMarkdownRemark.html
      }
    />
    <UsOverview
      statesCasesCount={42}
      statesDeathsCount={35}
      statesNotReporting={['Colorado', 'North Dakota', 'South Carolina']}
    />
    <NoData stateName="North Dakota" />
    <HeaderSorter stateName="California" stateReports="race" />
    <States />
  </Layout>
)

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
  }
`
