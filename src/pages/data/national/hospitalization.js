import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate, FormatNumber } from '~components/utils/format'
import Layout from '~components/layout'

const formatNumber = number => <FormatNumber number={number} />

export default ({ data }) => {
  return (
    <Layout
      title="National: Hospitalization"
      returnLinkTitle="Our Data"
      returnLink="/data"
      path="/data/national/hospitalization"
    >
      <p>Hospitalization</p>
      <TableResponsive
        labels={[
          {
            field: 'date',
            label: 'Date',
            format: date => <FormatDate date={date} format="ccc LLL d yyyy" />,
          },
          {
            field: 'hospitalizedCumulative',
            label: 'Hospitalized (cumulative)',
            format: formatNumber,
          },
          {
            field: 'hospitalizedCurrently',
            label: 'Hospitalized (currently)',
            format: formatNumber,
          },
          {
            field: 'hospitalizedIncrease',
            label: 'Hospitalized (increase)',
            format: formatNumber,
          },
          {
            field: 'hospitalizedCurrently',
            label: 'Hospitalized (currently)',
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
        hospitalizedCumulative
        hospitalizedCurrently
        hospitalizedIncrease
        inIcuCumulative
        inIcuCurrently
        onVentilatorCumulative
        onVentilatorCurrently
      }
    }
  }
`
