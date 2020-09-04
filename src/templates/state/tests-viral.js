import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import { FormatDate } from '~components/utils/format'
import Layout from '~components/layout'

const StateTestViralTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug

  return (
    <Layout
      title={`${state.name}: Viral (PCR) tests`}
      returnLinks={[
        { link: '/data', title: 'Our Data' },
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
            field: 'positiveTestsViral',
            isNumeric: true,
          },
          {
            field: 'totalTestsPeopleViral',
            isNumeric: true,
          },
          {
            field: 'totalTestsViral',
            isNumeric: true,
          },
          {
            field: 'totalTestEncountersViral',
            isNumeric: true,
          },
        ]}
        data={data.allCovidStateDaily.nodes}
      />
    </Layout>
  )
}

export default StateTestViralTemplate

export const query = graphql`
  query($state: String!) {
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        date
        positiveTestsViral
        totalTestsPeopleViral
        totalTestsViral
        totalTestEncountersViral
      }
    }

    allContentfulDataDefinition(
      filter: {
        fieldName: {
          in: [
            "positiveTestsViral"
            "totalTestsPeopleViral"
            "totalTestsViral"
            "totalTestEncountersViral"
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
