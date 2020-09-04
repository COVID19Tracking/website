import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import { FormatDate } from '~components/utils/format'
import Layout from '~components/layout'

const StateOutcomesTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  return (
    <Layout
      title={`${state.name}: Outcomes`}
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
          {
            field: 'deathProbable',
            isNumeric: true,
          },
          {
            field: 'deathConfirmed',
            isNumeric: true,
          },
        ]}
        data={data.allCovidStateDaily.nodes}
      />
    </Layout>
  )
}

export default StateOutcomesTemplate

export const query = graphql`
  query($state: String!) {
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        state
        date
        deathProbable
        deathIncrease
        deathConfirmed
        death
        recovered
      }
    }
    allContentfulDataDefinition(
      sort: { fields: name }
      filter: {
        fieldName: {
          in: ["recovered", "death", "deathProbable", "deathConfirmed"]
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
