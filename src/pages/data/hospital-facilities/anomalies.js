import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Container from '~components/common/container'
import ContentfulContent from '~components/common/contentful-content'
import HHSFacilitiesAnomalies from '~components/pages/data/hhs-facilities/anomalies'

const HHSHospitalizationSearch = ({ data }) => {
  return (
    <Layout
      title="Hospital Facilities Anomalies"
      returnLinks={[
        { link: '/data' },
        { title: 'Hospital facilities', link: '/data/hospital-facilities' },
      ]}
      path="/data/hospital-facilities/anomalies"
      description="The most detailed data ever made available on how COVID-19 is affecting American hospitals."
      noContainer
      showWarning
    >
      <Container centered>
        <ContentfulContent
          content={
            data.contentfulSnippet.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.contentfulSnippet.contentful_id}
        />
      </Container>
      <Container>
        <HHSFacilitiesAnomalies />
      </Container>
    </Layout>
  )
}

export default HHSHospitalizationSearch

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "hhs-facilities-anomalies" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
