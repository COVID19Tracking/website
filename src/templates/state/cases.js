import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate, FormatNumber } from '~components/utils/format'
import Layout from '~components/layout'

const formatNumber = number => <FormatNumber number={number} />

export default ({ pageContext, path, data }) => {
  const state = pageContext
  return (
    <Layout
      title={`${state.name}: Cases`}
      returnLinkTitle={state.name}
      returnLink={`/data/state/${state.slug}`}
      path={path}
    >
      <p>Cases</p>
      <TableResponsive
        labels={[
          {
            field: 'date',
            label: 'Date',
            format: date => <FormatDate date={date} />,
          },
          {
            field: 'positive',
            label: 'Cases (cumulative)',
            format: formatNumber,
          },

          {
            field: 'positiveIncrease',
            label: 'Cases (currently)',
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
        positive
        positiveIncrease
      }
    }
  }
`
