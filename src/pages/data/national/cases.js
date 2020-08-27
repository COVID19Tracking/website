import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate } from '~components/utils/format'
import { FormatDate } from '~components/utils/format'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

export default ({ data }) => {
  return (
    <Layout
      title="National data: Cases"
      returnLinkTitle="Our Data"
      returnLink="/data"
      path="/data/national/cases"
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
            field: 'positive',
            isNumeric: true,
          },

          {
            field: 'positiveIncrease',
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
        positive
        positiveIncrease
      }
    }
    allContentfulDataDefinition(
      filter: { fieldName: { in: ["positive", "positiveIncrease"] } }
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
