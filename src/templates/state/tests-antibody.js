import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const StateTestAntibodiesTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug

  return (
    <Layout
      title={`${state.name}: Antibody tests`}
      returnLinks={[
        { link: '/data', title: 'Our Data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
    >
      <Definitions
        definitions={data.allContentfulDataDefinition.nodes}
        order={[
          'totalTestsPeopleAntibody',
          'totalTestsAntibody',
          'negativeTestsPeopleAntibody',
          'negativeTestsAntibody',
          'positiveTestsPeopleAntibody',
          'positiveTestsAntibody',
        ]}
      />
      <TableResponsive
        labels={[
          {
            field: 'date',
            noWrap: true,
          },
          {
            field: 'totalTestsPeopleAntibody',
            isNumeric: true,
          },
          {
            field: 'totalTestsAntibody',
            isNumeric: true,
          },
          {
            field: 'negativeTestsPeopleAntibody',
            isNumeric: true,
          },
          {
            field: 'negativeTestsAntibody',
            isNumeric: true,
          },
          {
            field: 'positiveTestsPeopleAntibody',
            isNumeric: true,
          },
          {
            field: 'positiveTestsAntibody',
            isNumeric: true,
          },
        ]}
        data={data.allCovidStateDaily.nodes}
      />
    </Layout>
  )
}

export default StateTestAntibodiesTemplate

export const query = graphql`
  query($state: String!) {
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        date(formatString: "MMM D, YYYY")
        totalTestsPeopleAntibody
        totalTestsAntibody
        negativeTestsPeopleAntibody
        negativeTestsAntibody
        positiveTestsPeopleAntibody
        positiveTestsAntibody
      }
    }

    allContentfulDataDefinition(
      filter: {
        fieldName: {
          in: [
            "totalTestsPeopleAntibody"
            "totalTestsAntibody"
            "negativeTestsPeopleAntibody"
            "negativeTestsAntibody"
            "positiveTestsPeopleAntibody"
            "positiveTestsAntibody"
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
