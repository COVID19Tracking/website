import React from 'react'
import { graphql } from 'gatsby'

import DetailText from '~components/common/detail-text'
import Container from '~components/common/container'
import Layout from '~components/layout'
import ContentfulContent from '~components/common/contentful-content'
import MarkdownContent from '~components/common/markdown-content'
import { formatDateToString } from '~components/utils/format'

import States from '~components/pages/data/states'

import { DownloadDataRow } from '~components/pages/state/download-data'
import Summary from '~components/pages/data/summary'
import SummaryCharts from '~components/pages/data/summary-charts'

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
      <DownloadDataRow
        slug="all-states"
        lastUpdateEt={formatDateToString(
          data.lastUpdate.nodes[0].date,
          'ccc LLL d yyyy',
        )}
        unformatted
        national
      />
      <Summary
        stateSlug="national"
        data={data.covidUs}
        sevenDaysAgo={data.usSevenDaysAgo}
        raceData={{
          combined: false,
          separate: false,
        }}
        national
      />
      <Container narrow>
        <DetailText>
          <MarkdownContent
            html={data.nationalSummaryFootnote.content.childMarkdownRemark.html}
          />
        </DetailText>
      </Container>
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

      <States
        states={data.allCovidStateInfo.nodes}
        stateData={data.allCovidState.nodes}
        sevenDaysAgoList={data.allCovidStateDaily.nodes}
        stateMetadata={data.allContentfulStateOrTerritory.nodes}
      />
    </Layout>
  )
}

export const query = graphql`
  query($sevenDaysAgo: Int) {
    lastUpdate: allCovidUsDaily(sort: { fields: date, order: DESC }, limit: 1) {
      nodes {
        date
      }
    }
    nationalSummaryFootnote: contentfulSnippet(
      slug: { eq: "national-summary-footnote" }
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
      positiveIncrease
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
      totalTestResultsIncrease
    }
    usSevenDaysAgo: covidUsDaily(date: { eq: $sevenDaysAgo }) {
      positive
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
        childSlug {
          slug
        }
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
        dataQualityGrade
        death
        deathConfirmed
        deathProbable
        hospitalizedCumulative
        hospitalizedCurrently
        inIcuCumulative
        inIcuCurrently
        lastUpdateEt
        dateModified
        negative
        negativeTestsViral
        onVentilatorCumulative
        onVentilatorCurrently
        pending
        positive
        positiveCasesViral
        positiveIncrease
        positiveTestsViral
        posNeg
        recovered
        state
        totalTestResults
        totalTestResults
        totalTestsPeopleViral
        totalTestsViral
        totalTestEncountersViral
        totalTestsAntibody
      }
    }
    allCovidStateDaily(filter: { date: { eq: $sevenDaysAgo } }) {
      nodes {
        positive
        state
      }
    }
    allContentfulStateOrTerritory {
      nodes {
        testUnitsUnknown
        code
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
        date(formatString: "YYYYMMDD")
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
