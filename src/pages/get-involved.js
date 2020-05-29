/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import ContentfulContent from '~components/common/contentful-content'
import GetInvolvedForm from '~components/pages/get-involved/form'

export default ({ data }) => (
  <Layout title="Get Involved" narrow textHeavy>
    <ContentfulContent
      content={
        data.helpPreamble.edges[0].node.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.helpPreamble.edges[0].node.contentful_id}
    />
    <GetInvolvedForm />
    <ContentfulContent
      content={
        data.helpClosure.edges[0].node.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.helpClosure.edges[0].node.contentful_id}
    />
  </Layout>
)

export const query = graphql`
  query {
    helpPreamble: allContentfulSnippet(
      filter: { slug: { eq: "help-preamble" } }
    ) {
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
    helpClosure: allContentfulSnippet(filter: { slug: { eq: "help-close" } }) {
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
