import React from 'react'
import { graphql, Link } from 'gatsby'
import { Box } from '../../components/common/flexbox'
import StateList from '../../components/pages/data/state-list'
import Layout from '../../components/layout'
import { SyncInfobox } from '../../components/common/infobox'
import DetailText from '../../components/common/detail-text'
import SummaryTable from '../../components/common/summary-table'
import '../../scss/pages/data.scss'

const StatesNav = ({ stateList }) => (
  <Box width={[1, 1, 1, 1 / 2]} className="state-nav" m="0 auto 1rem">
    <h3>Jump to a state:</h3>
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
