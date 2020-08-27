import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import { FormatDate } from '~components/utils/format'
import Layout from '~components/layout'

export default ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  return (
    <Layout
      title={`${state.name}: Cases`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
    >
      <Definitions definitions={data.allContentfulDataDefinition.nodes} />
      <TableResponsive
        labels={[
          {
            field: 'date',
            format: date => <FormatDate date={date} format="ccc LLL d yyyy" />,
            noWrap: true,
          },
          {
            field: 'positive',
            isNumeric: true,
          },

          {
            field: 'positiveIncrease',
            isNumeric: true,
          },
          {
            field: 'positiveCasesViral',
            isNumeric: true,
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
        positiveCasesViral
      }
    }
    allContentfulDataDefinition(
      filter: {
        fieldName: {
          in: ["positive", "positiveCasesViral", "positiveIncrease"]
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
