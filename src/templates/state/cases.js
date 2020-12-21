import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const StateCasesTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug

  const annotations = data.allContentfulChartAnnotation.nodes
  const dataRows = data.allCovidStateDaily.nodes.slice(0, 10) // todo remove me

  // Match annotations with their respective days.
  annotations.forEach(annotation => {
    const row = dataRows.findIndex(r => r.date === annotation.date)
    console.log(dataRows[row])
    // todo use childMarkdownRemark here
    console.log(annotation)
    dataRows[row].annotations = (
      <small>{annotation.description.description}</small>
    )
  })

  return (
    <Layout
      title={`${state.name}: Cases`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
      showWarning
    >
      <Definitions
        definitions={data.allContentfulDataDefinition.nodes}
        order={[
          'positive',
          'positiveIncrease',
          'positiveCasesViral',
          'probableCases',
        ]}
      />
      <TableResponsive
        annotations={data.allContentfulChartAnnotation}
        labels={[
          {
            field: 'annotations',
          },
          {
            field: 'date',
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
            label: 'Confirmed cases',
          },
          {
            field: 'probableCases',
            isNumeric: true,
          },
        ]}
        data={dataRows}
      />
    </Layout>
  )
}

export default StateCasesTemplate

export const query = graphql`
  query($state: String!) {
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        date(formatString: "MMM D, YYYY")
        positive
        positiveIncrease
        positiveCasesViral
        probableCases
      }
    }
    allContentfulChartAnnotation(
      filter: { state: { code: { eq: "AL" } }, dataElement: { eq: "cases" } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        title
        description {
          description
        }
        date(formatString: "MMM DD, YYYY")
        dataElement
        contentful_id
        childContentfulChartAnnotationDescriptionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    allContentfulDataDefinition(
      filter: {
        fieldName: {
          in: [
            "positive"
            "positiveCasesViral"
            "positiveIncrease"
            "probableCases"
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
