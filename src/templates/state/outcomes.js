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

const StateOutcomesTemplate = ({ pageContext, path, data }) => {
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
      title={`${state.name}: Outcomes`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
      description={`Data definitions and historical time series of data on recovered cases and probable, confirmed, total, and daily new deaths in ${state.name}.`}
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
            title={`${state.name} outcomes time series information`}
          />
        )}
        <Definitions
          definitions={data.allContentfulDataDefinition.nodes}
          order={['recovered', 'death', 'deathProbable', 'deathConfirmed']}
        />
        <h2>Outcome History</h2>
        <TableResponsive
          labels={[
            {
              field: 'dateWithAnnotation',
              noWrap: true,
              style: tableResponsiveStyles.dateCell,
              label: 'Date',
            },
            {
              field: 'recovered',
              isNumeric: true,
            },
            {
              field: 'death',
              isNumeric: true,
            },
            {
              field: 'deathIncrease',
              isNumeric: true,
            },
            {
              field: 'deathProbable',
              isNumeric: true,
            },
            {
              field: 'deathConfirmed',
              isNumeric: true,
            },
          ]}
          data={dataRows}
        />
      </AnnotationPanelContext.Provider>
    </Layout>
  )
}

export default StateOutcomesTemplate

export const query = graphql`
  query($state: String!) {
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        state
        date(formatString: "MMMM D, YYYY")
        deathProbable
        deathIncrease
        deathConfirmed
        death
        recovered
      }
    }
    allContentfulChartAnnotation(
      filter: {
        state: { code: { eq: $state } }
        dataElement: { in: ["death", "recovery"] }
      }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        date(formatString: "MMMM D, YYYY")
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
