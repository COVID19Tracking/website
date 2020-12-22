import React, { useState } from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'
import {
  DefinitionPanel,
  AnnotationPanelContext,
} from '~components/pages/data/cards/definitions-panel'
import tableResponsiveStyles from '~components/common/table-responsive.module.scss'

import preprocessAnnotations from './preprocess-annotations'

const StateCasesTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug

  const { annotations, dataRows } = preprocessAnnotations(
    data.allContentfulChartAnnotation.nodes,
    data.allCovidStateDaily.nodes,
  )

  const [cardAnnotations, setCardAnnotations] = useState(false)
  const [highlightedAnnotation, setHighlightedAnnotation] = useState(false)

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
      <AnnotationPanelContext.Provider
        value={{
          annotations,
          setCardAnnotations: ({ fields, highlight }) => {
            setCardAnnotations(fields)
            setHighlightedAnnotation(highlight)
          },
        }}
      >
        {cardAnnotations && (
          <DefinitionPanel
            annotations={annotations}
            highlightedDefinition={highlightedAnnotation}
            onHide={() => setCardAnnotations(false)}
            title={`${state.name} Annotations & Warnings`}
          />
        )}
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
              field: 'dateWithAnnotation',
              noWrap: true,
              style: tableResponsiveStyles.dateCell,
              label: 'Date',
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
      </AnnotationPanelContext.Provider>
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
      filter: { state: { code: { eq: $state } }, dataElement: { eq: "cases" } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        title
        description {
          description
        }
        date(formatString: "MMM D, YYYY")
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
