import React from 'react'
import { graphql } from 'gatsby'

import DetailText from '~components/common/detail-text'
import Container from '~components/common/container'
import Layout from '~components/layout'
import ContentfulContent from '~components/common/contentful-content'
import States from '~components/pages/data/states'

import { DownloadDataRow } from '~components/pages/state/download-data'
import Summary from '~components/pages/data/summary'
import SummaryCharts from '~components/pages/data/summary-charts'
import DailyTweet from '~components/pages/data/daily-tweet'
import { Col, Row } from '~components/common/grid'

const DataPage = ({ data }) => {
  const stateNavList = []
  data.allCovidStateInfo.nodes.forEach(node => {
    stateNavList.push(node)
  })
  const pageDescription = 'Our most up-to-date data on COVID-19 in the US.'
  return (
    <Layout
      title="Our Data"
      description={pageDescription}
      socialCard={{
        description: pageDescription,
      }}
      path="/data"
    >
      <Row>
        <Col width={[4, 6, 3]}>
          <ContentfulContent
            content={data.dataPreamble.content.childMarkdownRemark.html}
            id={data.dataPreamble.contentful_id}
          />
        </Col>
        <Col width={[4, 6, 9]}>
          <DailyTweet />
        </Col>
      </Row>
      <DownloadDataRow
        slug="all-states"
        lastUpdateEt={data.lastUpdate.nodes[0].date}
        national
      />
      <Summary
        stateSlug="national"
        data={data.covidUs}
        sevenDaysAgo={data.usSevenDaysAgo}
        national
      />
      <Container narrow>
        <DetailText>
          <div
            dangerouslySetInnerHTML={{
              __html:
                data.nationalSummaryFootnote.content.childMarkdownRemark.html,
            }}
          />
        </DetailText>
      </Container>
      <SummaryCharts
        history={data.allCovidUsDaily.nodes}
        annotations={data.allContentfulChartAnnotation}
        national
      />

      <States
        states={data.allCovidStateInfo.nodes}
        stateData={data.allCovidState.nodes}
        sevenDaysAgoList={data.allCovidStateDaily.nodes}
        stateMetadata={data.allContentfulStateOrTerritory.nodes}
      />
    </Layout>
  )
}

export default DataPage

export const query = graphql`
  query($sevenDaysAgo: Date) {
    lastUpdate: allCovidUsDaily(sort: { fields: date, order: DESC }, limit: 1) {
      nodes {
        date(formatString: "MMMM D, YYYY")
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
        date(formatString: "YYYYMMDD")
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
        dateModified(formatString: "MMM D, YYYY h:mm a")
        negative
        negativeTestsViral
        onVentilatorCumulative
        onVentilatorCurrently
        pending
        positive
        positiveCasesViral
        probableCases
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
    allContentfulChartAnnotation(
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
        childContentfulChartAnnotationDescriptionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
