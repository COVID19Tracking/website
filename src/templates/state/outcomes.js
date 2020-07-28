import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import { FormatDate, FormatNumber } from '~components/utils/format'
import Layout from '~components/layout'

const formatNumber = number => <FormatNumber number={number} />

export default ({ pageContext, path, data }) => {
  const state = pageContext
  return (
    <Layout
      title={`${state.name}: Outcomes`}
      returnLinkTitle={state.name}
      returnLink={`/data/state/${state.slug}`}
      path={path}
    >
      <Definitions definitions={data.allContentfulDataDefinition.nodes} />
      <TableResponsive
        labels={[
          {
            field: 'date',
            label: 'Date',
            format: date => <FormatDate date={date} format="ccc LLL d yyyy" />,
          },
          {
            field: 'recovered',
            label: 'Recovered',
            format: formatNumber,
          },
          {
            field: 'deathProbable',
            label: 'Death (probable)',
            format: formatNumber,
          },
          {
            field: 'deathConfirmed',
            label: 'Death (confirmed)',
            format: formatNumber,
          },
          {
            field: 'death',
            label: 'Death (cumulative)',
            format: formatNumber,
          },
          {
            field: 'deathIncrease',
            label: 'Death (increase)',
            format: formatNumber,
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
