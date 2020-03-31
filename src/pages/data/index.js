import React from 'react'
import { graphql, Link } from 'gatsby'
import marked from 'marked'
import { Flex, Box } from '../../components/common/flexbox'
import { UnstyledList } from '../../components/common/lists'
import Layout from '../../components/layout'
import { SyncInfobox } from '../../components/common/infobox'
import slug from '../../utilities/slug'
import SummaryTable from '../../components/common/summary-table'
import '../../scss/pages/data.scss'

const State = ({ state }) => (
  <>
    <h3>
      <Link to={`/data/state/${slug(state.name)}`}>{state.name}</Link>
    </h3>
    <SummaryTable data={state.stateData} />
    <UnstyledList>
      {state.twitter && (
        <li>
          <a href={`https://twitter.com/${state.twitter}`}>
            {state.name} on Twitter
          </a>
        </li>
      )}
      {state.covid19Site && (
        <li>
          <a href={state.covid19Site}>
            Best current data source for {state.name}
          </a>
        </li>
      )}
      <li>
        <Link to={`/data/state/${slug(state.name)}#historical`}>
          Historical data for {state.name}
        </Link>
      </li>
      {state.stateData.grade && (
        <li>
          Data quality grade:{' '}
          <span className="state-grade">{state.stateData.grade}</span>
        </li>
      )}
    </UnstyledList>
    {state.notes && (
      <div
        dangerouslySetInnerHTML={{
          __html: marked(state.notes),
        }}
      />
    )}
    <a className="top-link" href="#states-top" title="top">
      ↑ (return to top)
    </a>
  </>
)

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
    <Flex flexWrap="wrap">
      {stateList.map(state => (
        <Box width={[1]} mb={['1rem', '1.5rem']} className="data-state">
          <State state={state} stateData={state.stateData} />
        </Box>
      ))}
    </Flex>
  )
}

// The top-level content of this page is from 'src/content/snippets/data.md'
export default ({ data }) => (
  <Layout
    title="Most recent data"
    navigation={data.allNavigationYaml.edges[0].node.items}
  >
    <div
      dangerouslySetInnerHTML={{
        __html: data.allMarkdownRemark.edges[0].node.html,
      }}
    />
    <SyncInfobox />
    <SummaryTable data={data.allCovidUs.edges[0].node} />
    <h2 id="states-top">States</h2>
    <StateList
      states={data.allCovidStateInfo.edges}
      stateData={data.allCovidState.edges}
    />
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { slug: { eq: "/data/" }, isPage: { eq: false } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          html
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
          total
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
          total
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
    allNavigationYaml(filter: { name: { eq: "data" } }) {
      edges {
        node {
          name
          items {
            title
            link
          }
        }
      }
    }
  }
`
