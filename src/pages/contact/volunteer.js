import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import VolunteerForm from '../../components/pages/contact/volunteer-form'

export default ({ data }) => (
  <Layout title="Contact us &mdash; Volunteering" narrow textHeavy>
    <div
      className="module-content"
      dangerouslySetInnerHTML={{
        __html:
          data.allContentfulSnippet.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
    />
    <VolunteerForm />
  </Layout>
)

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "volunteer-form" } }) {
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
