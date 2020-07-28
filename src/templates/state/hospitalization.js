import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate, FormatNumber } from '~components/utils/format'
import StateDataDefinitions from '~components/pages/state/data-definitions'
import Layout from '~components/layout'

const formatNumber = number => <FormatNumber number={number} />

export default ({ pageContext, path, data }) => {
  const state = pageContext
  return (
    <Layout
      title={`${state.name}: Hospitalization`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${state.slug}`, title: state.name },
      ]}
      path={path}
    >
      <p>Hospitalization</p>
      <StateDataDefinitions
        definitions={data.allContentfulDataDefinition.nodes}
      />
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
      filter: { fieldName: { in: ["hospitalizedCumulative"] } }
    ) {
      nodes {
        fieldName
        name
        childContentfulDataDefinitionDefinitionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
