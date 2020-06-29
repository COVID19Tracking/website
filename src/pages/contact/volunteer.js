import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import LongContent from '~components/common/long-content'
import Layout from '~components/layout'
import VolunteerForm from '~components/pages/contact/volunteer-form'

export default ({ data }) => (
  <Layout title="Contact Us &mdash; Volunteering" centered>
    <LongContent>
      <ContentfulContent
        content={
          data.contentfulSnippet.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.contentfulSnippet.contentful_id}
      />
      <VolunteerForm />
    </LongContent>
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
