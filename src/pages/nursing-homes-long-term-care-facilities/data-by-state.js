import React from 'react'
import { graphql, Link } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'
import StateNav from '~components/common/state-nav'

const LTCDataByState = ({ data }) => (
  <Layout
    title="Data by State"
    path="/nursing-homes-long-term-care-facilities/data-by-state"
    returnLinks={[{ link: '/nursing-homes-long-term-care-facilities' }]}
  >
    <ContentfulContent
      content={
        data.contentfulSnippet.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.contentfulSnippet.contentful_id}
    />
    <StateNav
      defaultIsOpen
      linkAs={({ state }) => (
        <Link to={`/data/state/${state.childSlug.slug}/long-term-care`}>
          {state.state}
        </Link>
      )}
    />
  </Layout>
)

export default LTCDataByState

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "ltc-data-by-sate-preamble" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
