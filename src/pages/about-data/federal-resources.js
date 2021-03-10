import React from 'react'
import { graphql } from 'gatsby'
import FederalResources from '~components/pages/about-data/federal-resources'
import FederalTrackers from '~components/pages/about-data/federal-trackers'
import Layout from '~components/layout'
import ContentfulContent from '~components/common/contentful-content'

const FederalResourcesPage = ({ data }) => (
  <Layout title="Federal Resources" centered>
    <ContentfulContent
      content={
        data.contentfulSnippet.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.contentfulSnippet.contentful_id}
    />
    <FederalResources />
    <FederalTrackers />
  </Layout>
)

export default FederalResourcesPage

export const query = graphql`
  {
    contentfulSnippet(slug: { eq: "federal-resources-prelude" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
