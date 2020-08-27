import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate } from '~components/utils/format'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

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
            isNumeric: true,
          },
          {
            field: 'hospitalizedCurrently',
            isNumeric: true,
          },
          {
            field: 'hospitalizedIncrease',
            isNumeric: true,
          },
          {
            field: 'inIcuCumulative',
            isNumeric: true,
          },
          {
            field: 'inIcuCurrently',
            isNumeric: true,
          },
          {
            field: 'onVentilatorCumulative',
            isNumeric: true,
          },
          {
            field: 'onVentilatorCurrently',
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
