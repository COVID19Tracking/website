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

const StateHospitalizationTemplate = ({ pageContext, path, data }) => {
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
      title={`${state.name}: Hospitalization`}
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
            title={`${state.name} hospitalizations time series information`}
          />
        )}
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
              field: 'dateWithAnnotation',
              noWrap: true,
              style: tableResponsiveStyles.dateCell,
              label: 'Date',
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
          data={dataRows}
        />
      </AnnotationPanelContext.Provider>
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
    allContentfulChartAnnotation(
      filter: {
        state: { code: { eq: $state } }
        dataElement: { eq: "hospitalizations" }
      }
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
