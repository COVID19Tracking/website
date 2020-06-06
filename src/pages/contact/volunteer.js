import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'
import VolunteerForm from '~components/pages/contact/volunteer-form'

export default ({ data }) => (
  <Layout title="Contact Us &mdash; Volunteering" narrow textHeavy>
    <ContentfulContent
      content={
        data.contentfulSnippet.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.contentfulSnippet.contentful_id}
    />
    <VolunteerForm />
  </Layout>
)

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "volunteer-form" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
