import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate, FormatNumber } from '~components/utils/format'
import Layout from '~components/layout'

const formatNumber = number => <FormatNumber number={number} />

export default ({ data }) => {
  return (
    <Layout
      title="National: Outcomes"
      returnLinkTitle="Our Data"
      returnLink="/data"
      path="/data/national/outcomes"
    >
      <p>Outcomes</p>
      <TableResponsive
        labels={[
          {
            field: 'date',

            format: date => <FormatDate date={date} format="ccc LLL d yyyy" />,
          },
          {
            field: 'recovered',

            format: formatNumber,
          },
          {
            field: 'death',

            format: formatNumber,
          },
          {
            field: 'deathIncrease',

            format: formatNumber,
          },
        ]}
        data={data.allCovidUsDaily.nodes}
      />
    </Layout>
  )
}

export const query = graphql`
  {
    allCovidUsDaily(sort: { fields: date, order: DESC }) {
      nodes {
        date
        death
        deathIncrease
        recovered
      }
    }
  }
`
