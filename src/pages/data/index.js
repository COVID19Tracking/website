import React from 'react'
import { graphql, Link } from 'gatsby'
import { Flex, Box } from '../../components/common/flexbox'
import State from '../../components/common/state-data'
import Layout from '../../components/layout'
import { SyncInfobox } from '../../components/common/infobox'
import SummaryTable from '../../components/common/summary-table'
import '../../scss/pages/data.scss'

const StateList = ({ states, stateData }) => {
  const stateList = []
  states.forEach(({ node }) => {
    const state = node
    stateData.forEach(data => {
      if (data.node.state === state.state) {
        state.stateData = data.node
      }
    })
    stateList.push(state)
  })
  return (
    <Flex flexWrap="wrap" m="0 -10px">
      {stateList.map(state => (
        <Box
          width={[1, 1, 1, 1 / 2]}
          mb={['1rem', '1.5rem']}
          p="0 10px"
          className="data-state"
        >
          <State state={state} stateData={state.stateData} />
        </Box>
      ))}
    </Flex>
  )
}

const StatesNav = ({ stateList }) => (
  <Box width={[1, 1, 1, 1 / 2]} className="state-nav" m="0 auto 1rem">
    <h2>Jump to a state:</h2>
    <ul>
      {stateList.map(state => (
        <li key={state.node.state}>
          <Link to={`/data#state-${state.node.state}`}>{state.node.state}</Link>
        </li>
      ))}
    </ul>
  </Box>
)

// The top-level content of this page is from 'src/content/snippets/data.md'
export default ({ data }) => (
  <Layout
    title="Most recent data"
    navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
  >
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.allContentfulSnippet.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
    />
    <SyncInfobox />
    <SummaryTable data={data.allCovidUs.edges[0].node} />
    <h2 id="states-top">States</h2>
    <StatesNav stateList={data.allCovidState.edges} />
    <StateList
      states={data.allCovidStateInfo.edges}
      stateData={data.allCovidState.edges}
    />
  </Layout>
)

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "data-preamble" } }) {
      edges {
        node {
          childContentfulSnippetContentTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allCovidUs {
      edges {
        node {
          death
          negative
          positive
          posNeg
          hospitalized
          totalTestResults
        }
      }
    }
    allCovidStateInfo(sort: { fields: state }) {
      edges {
        node {
          name
          state
          notes
          covid19Site
          covid19SiteSecondary
          twitter
        }
      }
    }
    allCovidState {
      edges {
        node {
          totalTestResults
          state
          score
          positive
          pending
          negative
          lastUpdateEt
          hospitalized
          grade
          death
        }
      }
    }
    allContentfulNavigationGroup(filter: { slug: { eq: "data" } }) {
      edges {
        node {
          pages {
            ... on ContentfulNavigationLink {
              link: url
              title
            }
          }
        }
      }
    }
  }
`
