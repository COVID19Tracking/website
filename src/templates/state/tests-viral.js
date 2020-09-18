import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const StateTestViralTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  const { totalTestResultsField } = data.covidStateInfo
  const totalTestResultsTitle = `Legacy total test results — ${
    totalTestResultsField === 'posNeg'
      ? '(positive + negative)'
      : totalTestResultsField
  })`

  return (
    <Layout
      title={`${state.name}: Viral (PCR) tests`}
      returnLinks={[
        { link: '/data', title: 'Our Data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
    >
      <Definitions
        definitions={data.allContentfulDataDefinition.nodes.map(node => {
          const result = { ...node }
          if (result.fieldName === 'totalTestResults') {
            result.name = totalTestResultsTitle
          }
          return result
        })}
      />
      <TableResponsive
        labels={[
          {
            field: 'date',
            noWrap: true,
          },
          {
            field: 'positiveTestsViral',
            isNumeric: true,
          },
          {
            field: 'totalTestsPeopleViral',
            isNumeric: true,
          },
          {
            field: 'totalTestsViral',
            isNumeric: true,
          },
          {
            field: 'totalTestEncountersViral',
            isNumeric: true,
          },
          {
            label: totalTestResultsTitle,
            field: 'totalTestResults',
            isNumeric: true,
          },
        ]}
        data={data.allCovidStateDaily.nodes}
      />
    </Layout>
  )
}

export default StateTestViralTemplate

export const query = graphql`
  query($state: String!) {
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        date(formatString: "MMM D, YYYY")
        positiveTestsViral
        totalTestsPeopleViral
        totalTestsViral
        totalTestEncountersViral
        totalTestResults
      }
    }

    allContentfulDataDefinition(
      filter: {
        fieldName: {
          in: [
            "positiveTestsViral"
            "totalTestsPeopleViral"
            "totalTestsViral"
            "totalTestEncountersViral"
            "totalTestResults"
          ]
        }
      }
    ) {
      nodes {
        fieldName
        name
        childContentfulDataDefinitionDefinitionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    covidStateInfo(state: { eq: $state }) {
      totalTestResultsField
    }
  }
`
