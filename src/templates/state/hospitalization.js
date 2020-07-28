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
      title={`${state.name}: Hospitalization`}
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
          {
            field: 'inIcuCumulative',
            label: 'In ICU (cumulative)',
            format: formatNumber,
          },
          {
            field: 'inIcuCurrently',
            label: 'In ICU (currently)',
            format: formatNumber,
          },
          {
            field: 'onVentilatorCumulative',
            label: 'On Ventilator (cumulative)',
            format: formatNumber,
          },
          {
            field: 'onVentilatorCurrently',
            label: 'On Ventilator (currently)',
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
      sort: { fields: name }
      filter: {
        fieldName: {
          in: [
            "hospitalizedCurrently"
            "hospitalizedCumulative"
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
