import React from 'react'
import { graphql } from 'gatsby'

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
      title="The Data"
      description={pageDescription}
      socialCard={{
        description: pageDescription,
      }}
      path="/data"
      showWarning
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
      <SummaryCharts
        history={data.allCovidUsDaily.nodes}
        annotations={data.allContentfulChartAnnotation}
        national
        chartTables="/data/national/chart-tables"
      />

      <States
        states={data.allCovidStateInfo.nodes}
        stateData={data.allCovidState.nodes}
        sevenDaysAgoList={data.allCovidStateDaily.nodes}
        stateMetadata={data.allContentfulStateOrTerritory.nodes}
        annotations={data.allCovidAnnotation.nodes}
        raceDataCombined={data.allCovidRaceDataCombined.nodes}
        raceDataSeparate={data.allCovidRaceDataSeparate.nodes}
        hhsHospitalization={data.allHhsHospitalizationCovid.group}
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
      hospitalizedCurrently
      inIcuCurrently
      negative
      onVentilatorCurrently
      pending
      positive
      positiveIncrease
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
        notes
        state
        twitter
        childSlug {
          slug
        }
        childLtc {
          current {
            total_cases
            total_death
            outbrkfac_alf
            outbrkfac_ltc
            outbrkfac_other
            outbrkfac_nh
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
        dateModified(formatString: "MMMM D, YYYY h:mm a")
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
    allCovidRaceDataCombined {
      nodes {
        state
        name
        blackSmallN
        latinXSmallN
        asianSmallN
        aianSmallN
        whiteSmallN
        apiSmallN
        nhpiSmallN
        blackPosPerCap
        blackDeathPerCap
        latinXPosPerCap
        latinXDeathPerCap
        asianPosPerCap
        asianDeathPerCap
        aianPosPerCap
        aianDeathPerCap
        whitePosPerCap
        whiteDeathPerCap
        nhpiPosPerCap
        nhpiDeathPerCap
        apiPosPerCap
        apiDeathPerCap
        lastCheckDate {
          value
        }
      }
    }
    allCovidRaceDataSeparate {
      nodes {
        state
        name
        knownRacePos
        knownRaceDeath
        knownEthPos
        knownEthDeath
        blackSmallN
        latinXSmallN
        asianSmallN
        aianSmallN
        whiteSmallN
        apiSmallN
        nhpiSmallN
        blackPosPerCap
        blackDeathPerCap
        latinXPosPerCap
        latinXDeathPerCap
        asianPosPerCap
        asianDeathPerCap
        aianPosPerCap
        aianDeathPerCap
        whitePosPerCap
        whiteDeathPerCap
        nhpiPosPerCap
        nhpiDeathPerCap
        apiPosPerCap
        apiDeathPerCap
        lastCheckDate {
          value
        }
      }
    }
    allHhsHospitalizationCovid(sort: { fields: date, order: DESC }) {
      group(field: state, limit: 1) {
        nodes {
          state
          date
          inpatient_beds_used_covid
          staffed_icu_adult_patients_confirmed_and_suspected_covid
          total_adult_patients_hospitalized_confirmed_covid
          total_pediatric_patients_hospitalized_confirmed_covid
        }
      }
    }
  }
`
