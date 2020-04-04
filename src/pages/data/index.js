/* eslint jsx-a11y/label-has-associated-control: 0 */

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
import DetailText from '../../components/common/detail-text'
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
          width={1}
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
      if (node.name.toLowerCase().search(term.toLowerCase()) > -1) {
        results.push(node)
      }
    })
    return results
  }

  const results = searchStates(searchTerm)

  return (
    <div className="state-combobox-nav">
      <noscript>
        <style>{`
    .state-combobox-nav {
      display: none !important;
    }
    `}</style>
      </noscript>
      <label htmlFor="jump-to-state">
        Type a state&apos;s name to jump to it
      </label>
      <Combobox
        openOnFocus
        onSelect={selectedItem => {
          const stateId = stateList.find(({ node }) => {
            return node.name === selectedItem
          })
          if (stateId && typeof window !== 'undefined') {
            window.location.hash = `state-${stateId.node.state.toLowerCase()}`
          }
        }}
      >
        <ComboboxInput
          id="jump-to-state"
          placeholder="State or territory"
          onChange={event => {
            setSearchTerm(event.target.value)
          }}
        />
        {results ? (
          <ComboboxPopover className="state-combobox-popover">
            {results.length > 0 ? (
              <ComboboxList aria-label="States">
                {results.slice(0, 10).map(result => (
                  <ComboboxOption
                    key={`state-search-${result.state}`}
                    value={result.name}
                  />
                ))}
              </ComboboxList>
            ) : (
              <span style={{ display: 'block', margin: 8 }}>
                No states found
              </span>
            )}
          </ComboboxPopover>
        ) : (
          <ComboboxPopover className="state-combobox-popover">
            <ComboboxList>
              {stateList.map(({ node }) => (
                <ComboboxOption
                  key={`state-search-${node.state}`}
                  value={node.name}
                />
              ))}
            </ComboboxList>
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
        __html: data.dataPreamble.nodes[0].content.childMarkdownRemark.html,
      }}
    />
    <SyncInfobox />
    <SummaryTable data={data.allCovidUs.edges[0].node} />
    <DetailText>
      <span
        dangerouslySetInnerHTML={{
          __html:
            data.dataSummaryFootnote.nodes[0].content.childMarkdownRemark.html,
        }}
      />
    </DetailText>
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
    dataSummaryFootnote: allContentfulSnippet(
      filter: { name: { eq: "Data summary footnote" } }
    ) {
      nodes {
        id
        name
        content {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    dataPreamble: allContentfulSnippet(
      filter: { slug: { eq: "data-preamble" } }
    ) {
      nodes {
        id
        name
        content {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    allCovidUs {
      edges {
        node {
          positive
          negative
          pending
          hospitalizedCurrently
          hospitalizedCumulative
          inIcuCurrently
          inIcuCumulative
          recovered
          onVentilatorCurrently
          onVentilatorCumulative
          death
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
          grade
          lastUpdateEt
          positive
          negative
          pending
          hospitalizedCurrently
          hospitalizedCumulative
          inIcuCurrently
          inIcuCumulative
          recovered
          onVentilatorCurrently
          onVentilatorCumulative
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
