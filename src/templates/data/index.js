import React from 'react'
import { graphql } from 'gatsby'

import DetailText from '~components/common/detail-text'
import Container from '~components/common/container'
import Layout from '~components/layout'

import ContentfulContent from '~components/common/contentful-content'
import MarkdownContent from '~components/common/markdown-content'

import States from '~components/pages/data/states'

import Summary from '~components/common/summary'
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
      />
    </Layout>
  )
}

export const query = graphql`
  query($sevenDaysAgo: Int) {
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
    }
    usSevenDaysAgo: covidUsDaily(date: { eq: $sevenDaysAgo }) {
      positive
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
        dataQualityGrade
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
        totalTestsViral
      }
    }
    allCovidStateDaily(filter: { date: { eq: $sevenDaysAgo } }) {
      nodes {
        positive
        state
      }
    }
    allContentfulEvent(
      filter: { displayNationalChart: { eq: true } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        title
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
