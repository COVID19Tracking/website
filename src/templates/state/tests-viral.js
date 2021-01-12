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

const fieldNameMappings = {
  'Total Tests (PCR)': 'Total PCR tests in specimens',
  'Total Test Encounters (PCR)': 'Total PCR tests in test encounters',
  'Total PCR Tests (People)': 'Total PCR tests in people',
  posNeg: 'positive + negative',
}

const StateTestViralTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  const { totalTestResultsField } = data.covidStateInfo
  const totalTestResultsTitle = `Total test results - legacy (${
    typeof fieldNameMappings[totalTestResultsField] !== 'undefined'
      ? fieldNameMappings[totalTestResultsField]
      : 'positive + negative'
  })`

  const { annotations, dataRows } = preprocessAnnotations(
    data.allContentfulChartAnnotation.nodes,
    data.allCovidStateDaily.nodes,
  )

  const [cardAnnotations, setCardAnnotations] = useState(false)
  const [highlightedAnnotation, setHighlightedAnnotation] = useState(false)

  return (
    <Layout
      title={`${state.name}: Viral (PCR) Tests`}
      returnLinks={[
        { link: '/data', title: 'Our Data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      description={`Data definitions and historical time series of data on total and positive viral (PCR) tests in units of specimens or people for ${state.name}.`}
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
            title={`${state.name} viral tests time series information`}
          />
        )}
        <Definitions
          definitions={data.allContentfulDataDefinition.nodes.map(node => {
            const result = { ...node }
            if (result.fieldName === 'totalTestResults') {
              result.name = totalTestResultsTitle
            }
            return result
          })}
          order={[
            'positiveTestsViral',
            'totalTestsPeopleViral',
            'totalTestsViral',
            'totalTestEncountersViral',
            'totalTestResults',
          ]}
        />
        <h2>Viral (PCR) Tests History</h2>
        <TableResponsive
          labels={[
            {
              field: 'dateWithAnnotation',
              noWrap: true,
              style: tableResponsiveStyles.dateCell,
              label: 'Date',
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
            {
              label: totalTestResultsTitle,
              field: 'totalTestResults',
              isNumeric: true,
            },
          ]}
          data={dataRows}
        />
      </AnnotationPanelContext.Provider>
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
        date(formatString: "MMMM D, YYYY")
        positiveTestsViral
        totalTestsPeopleViral
        totalTestsViral
        totalTestEncountersViral
        totalTestResults
      }
    }
    allContentfulChartAnnotation(
      filter: { state: { code: { eq: $state } }, dataElement: { eq: "tests" } }
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
      filter: {
        fieldName: {
          in: [
            "positiveTestsViral"
            "totalTestsPeopleViral"
            "totalTestsViral"
            "totalTestEncountersViral"
            "totalTestResults"
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
    covidStateInfo(state: { eq: $state }) {
      totalTestResultsField
    }
  }
`
