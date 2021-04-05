import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Container from '~components/common/container'
import LongContent from '~components/common/long-content'
import { CtaLink } from '~components/common/call-to-action'
import ContentfulContent from '~components/common/contentful-content'
import HHSFacilitiesSearch from '~components/pages/data/hhs-facilities/search'

const HHSHospitalizationSearch = ({ data }) => {
  return (
    <Layout
      title="Search Hospital Facilities"
      returnLinks={[{ link: '/data' }, { link: '/data/hospital-facilities' }]}
      path="/data/hospital-facilities/search"
      description="The most detailed data ever made available on how COVID-19 is affecting American hospitals."
      noContainer
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
        <HHSFacilitiesSearch />
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
