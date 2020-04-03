import React, { useState } from 'react'
import { graphql } from 'gatsby'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
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

const StatesNoScriptNav = ({ stateList }) => (
  <>
    <noscript>
      <style>{`
    .state-nav {
      display: block !important;
    }
    `}</style>
    </noscript>
    <Box width={[1, 1, 1, 1 / 2]} className="state-nav" m="0 auto 1rem">
      <h3>Jump to a state:</h3>
      <ul>
        {stateList.map(({ node }) => (
          <li key={node.state}>
            <a href={`#state-${node.state.toLowerCase()}`}>{node.state}</a>
          </li>
        ))}
      </ul>
    </Box>
  </>
)

const StatesNav = ({ stateList }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const searchStates = term => {
    if (term.trim() === '') {
      return null
    }
    const results = []
    stateList.forEach(({ node }) => {
      if (
        `${node.state} - ${node.name}`
          .toLowerCase()
          .search(term.toLowerCase()) > -1
      ) {
        results.push(node)
      }
    })
    return results
  }

  const results = searchStates(searchTerm)

  return (
    <div className="state-combobox-nav">
      <strong id="jump-to-state">Jump to state</strong>
      <Combobox
        onSelect={item => {
          if (typeof window !== 'undefined') {
            window.location.hash = `state-${item.toLowerCase()}`
          }
        }}
      >
        <ComboboxInput
          aria-labelledby="jump-to-state"
          placeholder="State or territory"
          onChange={event => {
            setSearchTerm(event.target.value)
          }}
        />
        {results && (
          <ComboboxPopover>
            {results.length > 0 ? (
              <ComboboxList aria-label="Cities">
                {results.slice(0, 10).map(result => (
                  <ComboboxOption
                    key={`state-search-${result.state}`}
                    value={result.state}
                  >
                    {`${result.state} - ${result.name}`}
                  </ComboboxOption>
                ))}
              </ComboboxList>
            ) : (
              <span style={{ display: 'block', margin: 8 }}>
                No states found
              </span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>
    </div>
  )
}

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
    <Flex
      flexWrap="wrap"
      alignItems="baseline"
      className="data-states-header"
      my={['0.5rem', '2rem']}
    >
      <Box width={[1, 1, 2 / 3]}>
        <h2 id="states-top">Totals by state</h2>
      </Box>
      <Box width={[1, 1, 1 / 3]} textAlign={['left', 'left', 'right']}>
        <StatesNav stateList={data.allCovidStateInfo.edges} />
      </Box>
    </Flex>
    <StatesNoScriptNav stateList={data.allCovidStateInfo.edges} />
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
            ... on ContentfulPage {
              title
              link: slug
            }
            ... on ContentfulNavigationLink {
              title
              link: url
            }
          }
        }
      }
    }
  }
`
