import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate } from '~components/utils/format'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const NationalDataOutcomesPage = ({ data }) => {
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
      <Definitions definitions={data.allContentfulDataDefinition.nodes} />
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

export default NationalDataOutcomesPage

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
    allContentfulDataDefinition(
      sort: { fields: name }
      filter: { fieldName: { in: ["recovered", "death"] } }
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
