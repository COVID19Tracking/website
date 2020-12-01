import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import ChartTables from '~components/pages/data/chart-tables'

const StateChartTablesPage = ({ pageContext, data, path }) => {
  const state = pageContext
  const {
    allCovidStateDaily,
    covidStateInfo,
    allCovidUsDaily,
    allContentfulChartAnnotation,
  } = data
  return (
    <Layout
      title={`${state.name} chart data`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${state.childSlug.slug}`, title: state.name },
      ]}
      path={path}
      showWarning
    >
      <ChartTables
        history={allCovidStateDaily.nodes}
        usHistory={allCovidUsDaily.nodes}
        annotations={allContentfulChartAnnotation}
        testSource={
          covidStateInfo.covidTrackingProjectPreferredTotalTestField ===
          'posNeg'
            ? 'totalTestResults'
            : covidStateInfo.covidTrackingProjectPreferredTotalTestField
        }
        testUnits={covidStateInfo.covidTrackingProjectPreferredTotalTestUnits}
      />
    </Layout>
  )
}

export default StateChartTablesPage

export const query = graphql`
  query($state: String!) {
    covidStateInfo(state: { eq: $state }) {
      state
      covidTrackingProjectPreferredTotalTestField
      covidTrackingProjectPreferredTotalTestUnits
      childPopulation {
        population
      }
    }
    allCovidUsDaily {
      nodes {
        date(formatString: "YYYYMMDD")
        childPopulation {
          deathIncrease {
            percent
          }
          positiveIncrease {
            percent
          }
          hospitalizedCurrently {
            percent
          }
        }
      }
    }
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        totalTestEncountersViralIncrease
        totalTestsViralIncrease
        totalTestsPeopleViralIncrease
        totalTestResultsIncrease
        positiveIncrease
        hospitalizedCurrently
        deathIncrease
        date(formatString: "YYYYMMDD")
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
          totalTestEncountersViralIncrease {
            percent
          }
          totalTestsViralIncrease {
            percent
          }
          totalTestsPeopleViralIncrease {
            percent
          }
          totalTestResultsIncrease {
            percent
          }
        }
      }
    }
    allContentfulChartAnnotation(
      filter: { state: { code: { eq: $state } } }
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
