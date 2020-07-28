import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import { FormatDate, FormatNumber } from '~components/utils/format'
import Layout from '~components/layout'

const formatNumber = number => <FormatNumber number={number} />

export default ({ pageContext, path, data }) => {
  const state = pageContext

  return (
    <Layout
      title={`${state.name}: Testing`}
      returnLinks={[
        { link: '/data', title: 'Our Data' },
        { link: `/data/state/${state.slug}`, title: state.name },
      ]}
      path={path}
    >
      <Definitions definitions={data.allContentfulDataDefinition.nodes} />
      <TableResponsive
        labels={[
          {
            field: 'date',

            format: date => <FormatDate date={date} format="ccc LLL d yyyy" />,
          },
          {
            field: 'negativeTestsViral',

            format: formatNumber,
          },
          {
            field: 'negative',

            format: formatNumber,
          },
          {
            field: 'negativeIncrease',

            format: formatNumber,
          },
          {
            field: 'positive',

            format: formatNumber,
          },
          {
            field: 'positiveIncrease',

            format: formatNumber,
          },
          {
            field: 'positiveCasesViral',

            format: formatNumber,
          },
          {
            field: 'positiveTestsViral',

            format: formatNumber,
          },
          {
            field: 'totalTestResults',

            format: formatNumber,
          },
          {
            field: 'totalTestsViral',

            format: formatNumber,
          },
        ]}
        data={data.allCovidStateDaily.nodes}
      />
    </Layout>
  )
}

export const query = graphql`
  query($state: String!) {
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        date
        negative
        negativeIncrease
        negativeTestsViral
        positive
        positiveCasesViral
        positiveIncrease
        positiveTestsViral
        totalTestResults
        totalTestResultsIncrease
        totalTestsViral
      }
    }

    allContentfulDataDefinition(
      filter: {
        fieldName: { in: ["negative", "positive", "positiveCasesViral"] }
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
  }
`
