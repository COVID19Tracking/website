import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const NationalDataCasesPage = ({ data }) => {
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
      <Definitions
        definitions={data.allContentfulDataDefinition.nodes}
        order={['positive', 'positiveIncrease']}
      />
      <TableResponsive
        labels={[
          {
            field: 'date',
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

export default NationalDataCasesPage

export const query = graphql`
  {
    allCovidUsDaily(sort: { fields: date, order: DESC }) {
      nodes {
        date(formatString: "MMM D, YYYY")
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
