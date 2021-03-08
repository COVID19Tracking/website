import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const StateTestAntigenTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug

  return (
    <Layout
      title={`${state.name}: Antigen tests`}
      returnLinks={[
        { link: '/data', title: 'Our Data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
      description={`Data definitions and time series of data on total and positive antigen tests in units of specimens or people for ${state.name}.`}
    >
      <Definitions
        definitions={data.allContentfulDataDefinition.nodes}
        order={[
          'totalTestsPeopleAntigen',
          'totalTestsAntigen',
          'positiveTestsPeopleAntigen',
          'positiveTestsAntigen',
        ]}
      />
      <TableResponsive
        labels={[
          {
            field: 'date',
            noWrap: true,
          },
          {
            field: 'totalTestsPeopleAntigen',
            isNumeric: true,
          },
          {
            field: 'totalTestsAntigen',
            isNumeric: true,
          },
          {
            field: 'positiveTestsPeopleAntigen',
            isNumeric: true,
          },
          {
            field: 'positiveTestsAntigen',
            isNumeric: true,
          },
        ]}
        data={data.allCovidStateDaily.nodes}
      />
    </Layout>
  )
}

export default StateTestAntigenTemplate

export const query = graphql`
  query($state: String!) {
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        date(formatString: "MMMM D, YYYY")
        positiveTestsPeopleAntigen
        positiveTestsAntigen
        totalTestsPeopleAntigen
        totalTestsAntigen
      }
    }
    allContentfulDataDefinition(
      filter: {
        fieldName: {
          in: [
            "totalTestsPeopleAntigen"
            "totalTestsAntigen"
            "positiveTestsPeopleAntigen"
            "positiveTestsAntigen"
          ]
        }
      }
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
