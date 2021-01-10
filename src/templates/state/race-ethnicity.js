import React, { useState } from 'react'
import { graphql } from 'gatsby'

// import TableResponsive from '~components/common/table-responsive'
import Layout from '~components/layout'
import Hero from '~components/pages/state/race-ethnicity/hero'

const RaceEthnicityHistoricalTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  // const { slug } = state.childSlug

  const [currentMetric, setCurrentMetric] = useState('Cases')

  // false: showing numbers, true: showing rates per 100k
  const [per100kToggle, setPer100kToggle] = useState(false)

  return (
    <Layout
      title={`${state.name}: Race & Ethnicity Historical Data`}
      returnLinks={[
        {
          link: '/race/dashboard',
          title: 'Racial Data Tracker',
        },
      ]}
      path={path}
      description={`Historical time series of race and ethnicity data in ${state.name}.`}
      showWarning
    >
      <Hero
        currentMetric={currentMetric}
        setCurrentMetric={setCurrentMetric}
        per100kToggle={per100kToggle}
        setPer100kToggle={setPer100kToggle}
      />
      {data.allCovidStateDaily.nodes[0].state}
    </Layout>
  )
}

export default RaceEthnicityHistoricalTemplate

export const query = graphql`
  query($state: String!) {
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        state
        date(formatString: "MMMM D, YYYY")
        deathProbable
        deathIncrease
        deathConfirmed
        death
        recovered
      }
    }
    allContentfulChartAnnotation(
      filter: {
        state: { code: { eq: $state } }
        dataElement: { in: ["death", "recovery"] }
      }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        date(formatString: "MMMM D, YYYY")
        childContentfulChartAnnotationDescriptionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    allContentfulDataDefinition(
      sort: { fields: name }
      filter: {
        fieldName: {
          in: ["recovered", "death", "deathProbable", "deathConfirmed"]
        }
      }
    ) {
      nodes {
        name
        fieldName
        childContentfulDataDefinitionDefinitionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
