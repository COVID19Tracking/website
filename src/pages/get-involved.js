/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import GetInvolvedForm from '~components/pages/get-involved/form'

export default ({ data }) => (
  <Layout title="Get Involved" narrow>
    <LongContent>
      <ContentfulContent
        content={
          data.helpPreamble.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.helpPreamble.contentful_id}
      />
      <GetInvolvedForm />
      <ContentfulContent
        content={
          data.helpClosure.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.helpClosure.contentful_id}
      />
    </LongContent>
  </Layout>
)

export const query = graphql`
  query {
    helpPreamble: contentfulSnippet(slug: { eq: "help-preamble" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    helpClosure: contentfulSnippet(slug: { eq: "help-close" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
