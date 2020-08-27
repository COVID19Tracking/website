import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate, FormatNumber } from '~components/utils/format'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const formatNumber = number => <FormatNumber number={number} />

export default ({ data }) => {
  return (
    <Layout
      title="National: Hospitalization"
      returnLinkTitle="Our Data"
      returnLink="/data"
      path="/data/national/hospitalization"
      returnLinks={[
        { link: '/data' },
        { link: `/data/national`, title: 'Totals for the US' },
      ]}
    >
      <Definitions definitions={data.allContentfulDataDefinition.nodes} />
      <TableResponsive
        labels={[
          {
            field: 'date',

            format: date => <FormatDate date={date} format="ccc LLL d yyyy" />,
          },
          {
            field: 'hospitalizedCumulative',

            format: formatNumber,
          },
          {
            field: 'hospitalizedCurrently',

            format: formatNumber,
          },
          {
            field: 'hospitalizedIncrease',

            format: formatNumber,
          },
          {
            field: 'inIcuCumulative',

            format: formatNumber,
          },
          {
            field: 'inIcuCurrently',

            format: formatNumber,
          },
          {
            field: 'onVentilatorCumulative',

            format: formatNumber,
          },
          {
            field: 'onVentilatorCurrently',

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
    allContentfulDataDefinition(
      sort: { fields: name }
      filter: {
        fieldName: {
          in: [
            "hospitalizedCumulative"
            "hospitalizedCurrently"
            "inIcuCurrently"
            "inIcuCumulative"
            "onVentilatorCumulative"
            "onVentilatorCurrently"
          ]
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
