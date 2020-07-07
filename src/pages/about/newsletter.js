/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import GetInvolvedForm from '~components/pages/get-involved/form'

export default ({ data }) => (
  <Layout
    title="Sign up for our newsletter"
    path="/about/newsletter"
    navigation={data.contentfulNavigationGroup.pages}
    centered
  >
    <LongContent>
      <ContentfulContent
        content={
          data.helpPreamble.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.helpPreamble.contentful_id}
      />
      <GetInvolvedForm />
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
    contentfulNavigationGroup(slug: { eq: "data" }) {
      pages {
        title
        link: url
      }
    }
  }
`
