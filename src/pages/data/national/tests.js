import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate, FormatNumber } from '~components/utils/format'
import Layout from '~components/layout'

const formatNumber = number => <FormatNumber number={number} />

export default ({ data }) => (
  <Layout
    title="National: testing"
    returnLinkTitle="Our Data"
    returnLink="/data"
    path="/data/national/tests"
  >
    <p>Testing</p>
    <TableResponsive
      labels={[
        {
          field: 'date',
          label: 'Date',
          format: date => <FormatDate date={date} format="ccc LLL d yyyy" />,
        },
        {
          field: 'negativeIncrease',
          label: 'Negative increase',
          format: formatNumber,
        },
        {
          field: 'negative',
          label: 'Negative (cumulative)',
          format: formatNumber,
        },
        {
          field: 'negativeIncrease',
          label: 'Negative (increase)',
          format: formatNumber,
        },
        {
          field: 'negativeIncrease',
          label: 'Negative (increase)',
          format: formatNumber,
        },
        {
          field: 'positive',
          label: 'Positive (cumulative)',
          format: formatNumber,
        },
        {
          field: 'positiveIncrease',
          label: 'Positive (increase)',
          format: formatNumber,
        },
        {
          field: 'totalTestResults',
          label: 'Total tests',
          format: formatNumber,
        },
      ]}
      data={data.allCovidUsDaily.nodes}
    />
  </Layout>
)

export const query = graphql`
  {
    allCovidUsDaily(sort: { fields: date, order: DESC }) {
      nodes {
        date
        negative
        negativeIncrease
        positive
        positiveIncrease
        totalTestResults
        totalTestResultsIncrease
      }
    }
  }
`
