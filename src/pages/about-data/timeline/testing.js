import React from 'react'
import { graphql } from 'gatsby'
import Timeline from '~components/common/timeline'
import Layout from '~components/layout'
import ContentfulContent from '~components/common/contentful-content'
import Container from '~components/common/container'

export default ({ data }) => (
  <Layout title="Timeline">
    <Container centered>
      <ContentfulContent
        content={
          data.contentfulSnippet.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.contentfulSnippet.contentful_id}
      />
    </Container>
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
    contentfulSnippet(slug: { eq: "timeline-preamble-testing" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
