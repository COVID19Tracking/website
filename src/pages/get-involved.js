/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import GetInvolvedForm from '~components/pages/get-involved/form'

export default ({ data }) => (
  <Layout title="Get Involved" narrow textHeavy>
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.helpPreamble.edges[0].node.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html,
      }}
    />
    <GetInvolvedForm />
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.helpClosure.edges[0].node.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html,
      }}
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
