import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import LongContent from '~components/common/long-content'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import Layout from '~components/layout'

const ContactPage = ({ data }) => (
  <Layout
    title="Contact Us"
    socialCard={{
      description:
        'The COVID Tracking Project runs on the effort and diligence of hundreds of volunteers, and we welcome your contribution.',
    }}
    centered
  >
    <LongContent>
      <ContentfulContent
        content={
          data.contentfulSnippet.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.contentfulSnippet.contentful_id}
      />
    </LongContent>
    <p>
      <CtaLink to="/contact/data" bold>
        I want to report an issue with your data
      </CtaLink>
    </p>
    <p>
      <CtaLink to="/contact/other" bold>
        I have a question about something else
      </CtaLink>
    </p>
  </Layout>
)

export default ContactPage

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "contact-page-form" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
