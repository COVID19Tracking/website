import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const StateHospitalizationTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  return (
    <Layout
      title={`${state.name}: Hospitalization`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
    >
      <Definitions
        definitions={data.allContentfulDataDefinition.nodes}
        order={[
          'hospitalizedCumulative',
          'hospitalizedCurrently',
          'inIcuCumulative',
          'inIcuCurrently',
          'onVentilatorCumulative',
          'onVentilatorCurrently',
        ]}
      />

      <TableResponsive
        labels={[
          {
            field: 'date',
            noWrap: true,
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
        data={data.allCovidStateDaily.nodes}
      />
    </Layout>
  )
}

export default StateHospitalizationTemplate

export const query = graphql`
  query($state: String!) {
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        state
        date(formatString: "MMM D, YYYY")
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
