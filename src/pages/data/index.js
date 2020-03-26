import React from 'react'
import { graphql, Link } from 'gatsby'
import { Flex, Box } from 'reflexbox'
import marked from 'marked'
import { UnstyledList } from '../../components/common/lists'
import Layout from '../../components/layout'
import BuildTime from '../../components/common/build-time'
import slug from '../../utilities/slug'
import SummaryTable from '../../components/common/summary-table'
import '../../scss/pages/data.scss'

const State = ({ state }) => (
  <>
    <h3>
      <Link to={`/data/state/${slug(state.name)}`}>{state.name}</Link>
    </h3>
    <SummaryTable data={state._stateData} />
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
      {state.grade && (
        <li>
          Data quality grade: <span className="state-grade">{state.grade}</span>
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
  </>
)

const StateList = ({ states, stateData }) => {
  const stateList = []
  states.forEach(({ node }) => {
    stateData.forEach(data => {
      if (data.node.state === node.state) {
        node._stateData = data.node
      }
    })
    stateList.push(node)
  })
  return (
    <Flex flexWrap="wrap">
      {stateList.map(state => (
        <Box width={[1, 1 / 2]} mb={['1rem', '1.5rem']} className="data-state">
          <State state={state} stateData={state._stateData} />
        </Box>
      ))}
    </Flex>
  )
}

// The top-level content of this page is from 'src/content/snippets/data.md'
export default ({ data }) => (
  <Layout title="Data">
    <div
      dangerouslySetInnerHTML={{
        __html: data.allMarkdownRemark.edges[0].node.html,
      }}
    />
    <BuildTime />
    <SummaryTable data={data.allCovidUs.edges[0].node} />
    <h2>States</h2>
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
  }
`
