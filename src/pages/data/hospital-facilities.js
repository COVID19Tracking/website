import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import ContentfulContent from '~components/common/contentful-content'
import Container from '~components/common/container'
import HHSFacilitiesMap from '~components/pages/data/hhs-facilities/map'

const StateHHSHospitalization = ({ data }) => {
  const Snippet = ({ slug }) => {
    const item = data.contentfulSnippetCollection.snippets.find(
      snippet => snippet.slug === slug,
    )
    return (
      <ContentfulContent
        id={item.contentful_id}
        content={
          item.childContentfulSnippetContentTextNode.childMarkdownRemark.html
        }
      />
    )
  }

  return (
    <Layout
      title="Hospital facilities"
      returnLinks={[{ link: '/data' }]}
      path="/data/hospital-facilities"
      showWarning
      noContainer
    >
      <Container centered>
        <Snippet slug="hhs-facilities-intro" />
      </Container>
      <HHSFacilitiesMap
        center={[-97, 38]}
        zoom={4}
        definitions={<Snippet slug="hhs-facilities-data-description" />}
      />
      <Container centered>
        <Snippet slug="hhs-facilities-closure" />
      </Container>
    </Layout>
  )
}

export default StateHHSHospitalization

export const data = graphql`
  {
    contentfulSnippetCollection(slug: { eq: "hhs-facilities-page" }) {
      snippets {
        contentful_id
        slug
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
