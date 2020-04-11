import React from 'react'
import { graphql } from 'gatsby'
import SwaggerSandbox from '../../components/common/swagger-sandbox'
// import { Flex, Box } from '../../components/common/flexbox'
// import DetailText from '../../components/common/detail-text'
import Layout from '../../components/layout'
// import StateList from '../../components/pages/data/state-list'
// import StatesNav from '../../components/pages/data/state-nav'
// import SummaryTable from '../../components/common/summary-table'
// import { SyncInfobox } from '../../components/common/infobox'
// import stateNavStyles from './index.module.scss'

export default ({ data }) => (
  <Layout
    title="API Sandbox"
    navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
  >
    <SwaggerSandbox />
  </Layout>
)

export const query = graphql`
  query {
    allContentfulNavigationGroup(filter: { slug: { eq: "data" } }) {
      edges {
        node {
          pages {
            ... on ContentfulPage {
              title
              link: slug
            }
            ... on ContentfulNavigationLink {
              title
              link: url
            }
          }
        }
      }
    }
  }
`
