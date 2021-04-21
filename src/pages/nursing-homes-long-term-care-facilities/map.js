import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import LTCMap from '~components/pages/data/long-term-care/map'
import ContentfulContent from '~components/common/contentful-content'
import Container from '~components/common/container'

const LTCMapPage = ({ data }) => {
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
      title="Nursing Homes and Other Long-Term-Care Facilities"
      returnLinks={[{ link: '/nursing-homes-long-term-care-facilities' }]}
      noContainer
    >
      <Container centered>
        <Snippet slug="ltc-map-lede" />
      </Container>
      <LTCMap center={[-97, 38]} zoom={3.5} />
      <Container centered>
        <Snippet slug="ltc-map-closure" />
      </Container>
    </Layout>
  )
}

export default LTCMapPage

export const query = graphql`
  query {
    contentfulSnippetCollection(slug: { eq: "long-term-care-map-page" }) {
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
