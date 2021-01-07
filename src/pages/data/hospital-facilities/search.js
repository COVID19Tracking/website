import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Container from '~components/common/container'
import LongContent from '~components/common/long-content'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import ContentfulContent from '~components/common/contentful-content'
import HHSFacilitiesSearch from '~components/pages/data/hhs-facilities/search'

const HHSHospitalizationSearch = ({ data }) => {
  return (
    <Layout
      title="Search Hospital Facilities"
      returnLinks={[{ link: '/data' }]}
      path="/data/hospital-facilities"
      noContainer
      showWarning
    >
      <Container centered>
        <LongContent>
          <ContentfulContent
            content={
              data.contentfulSnippet.childContentfulSnippetContentTextNode
                .childMarkdownRemark.html
            }
            id={data.contentfulSnippet.contentful_id}
          />
          <CtaLink to="/data/hospital-facilities" block>
            Read more about the HHS dataset
          </CtaLink>
        </LongContent>
      </Container>
      <Container>
        <HHSFacilitiesSearch center={[-97, 38]} zoom={4} />
      </Container>
    </Layout>
  )
}

export default HHSHospitalizationSearch

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "hhs-facilities-intro" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
