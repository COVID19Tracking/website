import React from 'react'
import { graphql } from 'gatsby'
import { Flex, Box } from '../../components/layout/flexbox'
import DetailText from '../../components/common/detail-text'
import Layout from '../../components/layout'
import StateList from '../../components/pages/data/state-list'
import StatesNoScriptNav from '../../components/pages/data/state-nav-no-script'
import StatesNav from '../../components/pages/data/state-nav'
import SummaryTable from '../../components/common/summary-table'
import { SyncInfobox } from '../../components/common/infobox'
import stateNavStyles from './index.module.scss'

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
    <SummaryTable data={data.allCovidUs.edges[0].node} showOutcomes={false} />
    <DetailText>
      <span
        dangerouslySetInnerHTML={{
          __html:
            data.dataSummaryFootnote.nodes[0].content.childMarkdownRemark.html,
        }}
      />
    </DetailText>
    <Flex
      my={['0.5rem', '2rem']}
      className={`state-nav-header ${stateNavStyles.stateNav}`}
    >
      <Flex
        flexWrap="wrap"
        alignItems="baseline"
        className={stateNavStyles.stateNavInner}
      >
        <Box width={[1, 1, 1 / 2]}>
          <h2 id="states-top">Totals by state</h2>
        </Box>
        <Box width={[1, 1, 1 / 2]} textAlign={['left', 'left', 'right']}>
          <StatesNav stateList={data.allCovidStateInfo.edges} />
        </Box>
      </Flex>
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
    dataSummaryFootnote: allContentfulSnippet(
      filter: { slug: { eq: "data-summary-footnote" } }
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
    allCovidStateInfo(sort: { fields: name }) {
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
