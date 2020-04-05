import React from 'react'
import { graphql } from 'gatsby'
import PressLogos from '../../components/pages/homepage/press-logos'
import PressList from '../../components/common/press-list'
import Layout from '../../components/layout'

export default ({ data }) => (
  <Layout title="In the press">
    <PressLogos />
    <PressList items={data.allCovidPress.edges} />
  </Layout>
)

export const query = graphql`
  {
    allCovidPress(
      filter: {
        addToCovidTrackingProjectWebsite: { eq: true }
        title: { ne: "null" }
      }
      sort: { fields: publishDate, order: DESC }
    ) {
      edges {
        node {
          title
          url
          publication
          publishDate(formatString: "MMMM D YYYY")
        }
      }
    }
  }
`
