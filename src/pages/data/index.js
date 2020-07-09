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

import SummaryCharts from '~components/common/summary-charts'

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
      path="/data"
    >
      <ContentfulContent
        content={data.dataPreamble.content.childMarkdownRemark.html}
        id={data.dataPreamble.contentful_id}
      />
      <SyncInfobox />
      <SummaryTable data={data.covidUs} usData showFootnote />
      <SummaryCharts
        history={data.allCovidUsDaily.nodes}
        annotations={data.allContentfulEvent}
      />

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
        hospitalizedCurrently
        deathIncrease
        childPopulation {
          deathIncrease {
            percent
          }
          hospitalizedCurrently {
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
    allContentfulEvent(
      filter: { displayNationalChart: { eq: true } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        title
        description {
          description
        }
        date(formatString: "YYYY/MM/DD")
        dataElement
        contentful_id
        childContentfulEventDescriptionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
