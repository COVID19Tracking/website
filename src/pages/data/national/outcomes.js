import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate } from '~components/utils/format'
import Layout from '~components/layout'

export default ({ data }) => {
  return (
    <Layout
      title="National: Outcomes"
      returnLinkTitle="Our Data"
      returnLink="/data"
      path="/data/national/outcomes"
      returnLinks={[
        { link: '/data' },
        { link: `/data/national`, title: 'Totals for the US' },
      ]}
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
            isNumeric: true,
          },
          {
            field: 'death',
            isNumeric: true,
          },
          {
            field: 'deathIncrease',
            isNumeric: true,
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
