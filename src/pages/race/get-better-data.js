import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import AdvocacyForm from '~components/pages/race/get-better-data/advocacy-form'

const RaceGetBetterDataPage = ({ data }) => {
  const states = data.allCovidStateInfo.nodes
    .map(state => state.name) // just get the names
    .sort((a, b) => a.localeCompare(b)) // sort alphabetically
  states.unshift('-- Select a state --')

  // combine the Civil Service data with custom territory data
  const governors = data.allCivilServiceGovernor.nodes.concat(
    data.allTerritoryInfo.nodes,
  )

  const stateScripts = data.allContentfulCrdtAdvocacyState.nodes
  const stateNames = data.allCovidStateInfo.nodes
  const combinedRaceData = data.allCovidRaceDataCombined.nodes
  const separateRaceData = data.allCovidRaceDataSeparate.nodes

  // join state info, race data, and state scripts
  const stateInfo = stateNames.map(state => ({
    ...state,
    ...stateScripts.find(stateScript => stateScript.state === state.name),
    ...combinedRaceData.find(raceDatum => raceDatum.name === state.name),
    ...separateRaceData.find(raceDatum => raceDatum.name === state.name),
  }))

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
        stateInfo={stateInfo}
        governors={governors}
      />
    </Layout>
  )
}

export default RaceGetBetterDataPage

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
        twitter_url
      }
    }
    allTerritoryInfo {
      nodes {
        contact_page
        facebook_url
        phone
        state_name
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
        stateAbbreviation: state
        name
      }
    }
    allCovidRaceDataCombined {
      nodes {
        knownRaceEthDeath
        knownRaceEthPos
        name
      }
    }
    allCovidRaceDataSeparate {
      nodes {
        knownEthDeath
        knownRaceDeath
        knownRacePos
        knownEthPos
        name
      }
    }
  }
`
