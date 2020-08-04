import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import AdvocacyForm from '~components/pages/race/get-better-data/advocacy-form'

export default ({ data }) => {
  const states = data.allCovidStateInfo.nodes.map(state => state.name)
  states.unshift('-- Select a state --')

  return (
    <Layout
      title="Help Us Get Better Race and Ethnicity Data"
      returnLink="/race"
      path="/race/get-better-data"
      narrow
      centered
    >
      <div
        dangerouslySetInnerHTML={{
          __html: data.contentfulSnippet.content.childMarkdownRemark.html,
        }}
      />
      <h2>Instructions</h2>
      <AdvocacyForm
        states={states}
        stateScripts={data.allContentfulCrdtAdvocacyState.nodes}
        governors={data.allCivilServiceGovernor.nodes}
      />
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
    allCivilServiceGovernor {
      nodes {
        contact_page
        facebook_url
        phone
        state_name
        twitter_handle
        twitter_url
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
