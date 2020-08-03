import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Container from '~components/common/container'
import AdvocacyForm from '~components/pages/race/advocate/advocacy-form'

export default ({ data }) => {
  const states = data.allCovidStateInfo.nodes.map(state => state.name)
  return (
    <Layout
      title="Help Us Get Better Race and Ethnicity Data"
      returnLink="/race"
      path="/race/advocate"
    >
      <Container narrow centered>
        <div
          dangerouslySetInnerHTML={{
            __html: data.contentfulSnippet.content.childMarkdownRemark.html,
          }}
        />
        <h2>Instructions</h2>
        <AdvocacyForm states={states} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulCrdtAdvocacyState {
      nodes {
        state
        message {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    contentfulSnippet(slug: { eq: "crdt-advocacy-page-preamble" }) {
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    allCovidStateInfo {
      nodes {
        name
      }
    }
  }
`
