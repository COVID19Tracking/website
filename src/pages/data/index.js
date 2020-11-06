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
      <ContentfulContent
        content={data.dataPreamble.content.childMarkdownRemark.html}
        id={data.dataPreamble.contentful_id}
      />

      <DailyTweet />
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
        annotations={data.allCovidAnnotation.nodes}
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
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    dataPreamble: contentfulSnippet(slug: { eq: "data-preamble" }) {
      contentful_id
      name
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    covidUs {
      death
      hospitalizedCumulative
      hospitalizedCurrently
      inIcuCumulative
      inIcuCurrently
      negative
      onVentilatorCumulative
      onVentilatorCurrently
      pending
      positive
      positiveIncrease
      recovered
      totalTestResults
      totalTestResultsIncrease
    }
    usSevenDaysAgo: covidUsDaily(date: { eq: $sevenDaysAgo }) {
      positive
      totalTestResults
    }
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        covid19Site
        covid19SiteSecondary
        name
        notes
        state
        twitter
        childSlug {
          slug
        }
        childLtc {
          facilities
          current {
            total_cases
            total_death
            date
          }
          last {
            total_cases
            total_death
            date
          }
        }
      }
    }
    allCovidUsDaily {
      nodes {
        date(formatString: "YYYYMMDD")
        deathIncrease
        hospitalizedCurrently
        positiveIncrease
        totalTestResultsIncrease
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
        dateModified(formatString: "MMM D, YYYY h:mm a")
        death
        deathConfirmed
        deathProbable
        hospitalizedCumulative
        hospitalizedCurrently
        inIcuCumulative
        inIcuCurrently
        lastUpdateEt
        negative
        negativeTestsViral
        onVentilatorCumulative
        onVentilatorCurrently
        positive
        positiveCasesViral
        positiveIncrease
        positiveTestsViral
        probableCases
        recovered
        state
        totalTestEncountersViral
        totalTestResults
        totalTestsAntibody
        totalTestsPeopleAntibody
        totalTestsPeopleViral
        totalTestsViral
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
        contentful_id
        dataElement
        date(formatString: "YYYYMMDD")
        childContentfulChartAnnotationDescriptionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    allCovidAnnotation {
      nodes {
        airtable_id
        state
        field
        lastChecked(formatString: "MMMM DD yyyy")
        warning
      }
    }
  }
`
