import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Timeline from '~components/pages/timeline'

export default ({ data }) => (
  <Layout
    title="Timeline"
    path="/about-project/timeline"
    navigation={data.contentfulNavigationGroup.pages}
  >
    <Timeline events={data.allContentfulEvent.nodes} />
  </Layout>
)

export const query = graphql`
  query {
    allContentfulEvent(
      filter: { timeline: { eq: "state-federal" }, annotation: { ne: true } }
    ) {
      nodes {
        title
        date
        dateEnd
        timeline
        externalLink
        childContentfulEventDescriptionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    contentfulNavigationGroup(slug: { eq: "about-project" }) {
      pages {
        title
        link: url
      }
    }
  }
`
