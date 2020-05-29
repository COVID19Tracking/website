import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '../../components/layout'
import VolunteerForm from '../../components/pages/contact/volunteer-form'

export default ({ data }) => (
  <Layout title="Contact us &mdash; Volunteering" narrow textHeavy>
    <ContentfulContent
      content={
        data.allContentfulSnippet.edges[0].node
          .childContentfulSnippetContentTextNode.childMarkdownRemark.html
      }
      id={data.allContentfulSnippet.edges[0].node.contentful_id}
    />
    <VolunteerForm />
  </Layout>
)

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "volunteer-form" } }) {
      edges {
        node {
          contentful_id
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
