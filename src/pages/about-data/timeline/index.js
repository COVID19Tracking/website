import React from 'react'
import { graphql } from 'gatsby'
import Timeline from '~components/common/timeline'
import Layout from '~components/layout'

export default ({ data }) => (
  <Layout title="Timeline">
    <Timeline timeline={data.allContentfulEvent.nodes} />
  </Layout>
)

export const query = graphql`
  {
    allContentfulEvent(
      filter: { displayTimeline: { eq: true }, timeline: { eq: "antibody" } }
    ) {
      nodes {
        title
        timeline
        description {
          childMarkdownRemark {
            html
          }
        }
        mediaCaption
        mediaCredit
        media {
          media
        }
        date
        dateEnd
      }
    }
  }
`
