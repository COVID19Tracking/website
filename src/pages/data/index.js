import React from 'react'
import { graphql } from 'gatsby'
import DetailText from '~components/common/detail-text'
import Container from '~components/common/container'
import ContentfulContent from '~components/common/contentful-content'
import MarkdownContent from '~components/common/markdown-content'
import Layout from '~components/layout'
import StateList from '~components/pages/data/state-list'
import StatesNoScriptNav from '~components/pages/data/state-nav-no-script'
import StatesNav from '~components/common/state-nav'
import SummaryTable from '~components/common/summary-table'
import { SyncInfobox } from '~components/common/infobox'

// TODO: We will want to move this component if we really want to keep this.
import StateCharts from '~components/pages/state/charts'

export default ({ data }) => {
  const stateNavList = []
  data.allCovidStateInfo.nodes.forEach(node => {
    stateNavList.push(node)
  })
  return (
    <Layout
      title="Our Data"
      socialCard={{
        description: 'Our most up-to-date data on COVID-19 in the US.',
      }}
      navigation={data.contentfulNavigationGroup.pages}
    >
      <ContentfulContent
        content={data.dataPreamble.content.childMarkdownRemark.html}
        id={data.dataPreamble.contentful_id}
      />
      <SyncInfobox />
      <SummaryTable data={data.covidUs} showOutcomes={false} showFootnote />
      <StateCharts history={data.allCovidUsDaily.nodes} />

      <Container narrow>
        <DetailText>
          <MarkdownContent
            html={data.dataSummaryFootnote.content.childMarkdownRemark.html}
          />
        </DetailText>
      </Container>
      <StatesNav title="Totals by state" stateList={stateNavList} />

      <StatesNoScriptNav stateList={data.allCovidStateInfo.nodes} />
      <StateList
        states={data.allCovidStateInfo.nodes}
        stateData={data.allCovidState.nodes}
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    dataSummaryFootnote: contentfulSnippet(
      slug: { eq: "data-summary-footnote" }
    ) {
      id
      contentful_id
      name
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    dataPreamble: contentfulSnippet(slug: { eq: "data-preamble" }) {
      id
      contentful_id
      name
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    covidUs {
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
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        name
        state
        notes
        covid19Site
        covid19SiteSecondary
        twitter
      }
    }
    allCovidUsDaily {
      nodes {
        date
        totalTestResultsIncrease
        positiveIncrease
        hospitalizedIncrease
        deathIncrease
        childPopulation {
          deathIncrease {
            percent
          }
          hospitalizedIncrease {
            percent
          }
          positiveIncrease {
            percent
          }
          totalTestResultsIncrease {
            percent
          }
        }
      }
    }
    allCovidState {
      nodes {
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
    contentfulNavigationGroup(slug: { eq: "data" }) {
      pages {
        title
        link: url
      }
    }
  }
`
