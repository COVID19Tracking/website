import React from 'react'
import { graphql } from 'gatsby'
import DetailText from '~components/common/detail-text'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'
import StateList from '~components/pages/data/state-list'
import StatesNoScriptNav from '~components/pages/data/state-nav-no-script'
import StatesNav from '~components/common/state-nav'
import SummaryTable from '~components/common/summary-table'
import { SyncInfobox } from '~components/common/infobox'

export default ({ data }) => {
  const stateNavList = []
  data.allCovidStateInfo.edges.forEach(({ node }) => {
    stateNavList.push(node)
  })
  return (
    <Layout
      title="Our Data"
      socialCard={{
        description: 'Our most up-to-date data on COVID-19 in the US.',
      }}
      navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
    >
      <ContentfulContent
        className="module-content"
        content={data.dataPreamble.nodes[0].content.childMarkdownRemark.html}
        id={data.dataPreamble.nodes[0].contentful_id}
      />
      <SyncInfobox />
      <SummaryTable data={data.allCovidUs.edges[0].node} showOutcomes={false} />
      <DetailText>
        <span
          className="module-content"
          dangerouslySetInnerHTML={{
            __html:
              data.dataSummaryFootnote.nodes[0].content.childMarkdownRemark
                .html,
          }}
        />
      </DetailText>
      <StatesNav title="Totals by state" stateList={stateNavList} />

      <StatesNoScriptNav stateList={data.allCovidStateInfo.edges} />
      <StateList
        states={data.allCovidStateInfo.edges}
        stateData={data.allCovidState.edges}
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    dataSummaryFootnote: allContentfulSnippet(
      filter: { slug: { eq: "data-summary-footnote" } }
    ) {
      nodes {
        id
        contentful_id
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
        contentful_id
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
          dataQualityGrade
          dateModified
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
