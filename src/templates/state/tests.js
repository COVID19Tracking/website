import React, { useState } from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate, FormatNumber } from '~components/utils/format'
import { DefinitionPanel } from '~components/common/cards/definitions-panel'
import { DefinitionLink } from '~components/common/statistic'
import Layout from '~components/layout'

const formatNumber = number => <FormatNumber number={number} />

export default ({ pageContext, path, data }) => {
  const state = pageContext
  const [highlightedDefinition, setHighlightedDefinition] = useState(false)

  return (
    <Layout
      title={`${state.name}: Testing`}
      returnLinkTitle={state.name}
      returnLink={`/data/state/${state.slug}`}
      path={path}
    >
      <p>Testing</p>
      {highlightedDefinition && (
        <DefinitionPanel
          definitions={data.allContentfulDataDefinition.nodes}
          highlightedDefinition={highlightedDefinition}
          onHide={() => setHighlightedDefinition(false)}
        />
      )}
      <TableResponsive
        labels={[
          {
            field: 'date',
            label: 'Date',
            format: date => <FormatDate date={date} format="ccc LLL d yyyy" />,
          },
          {
            field: 'negativeIncrease',
            label: 'Negative increase',
            format: formatNumber,
          },
          {
            field: 'negativeTestsViral',
            label: 'Viral test: Negative',
            format: formatNumber,
          },
          {
            field: 'negative',
            label: (
              <>
                Negative (cumulative){' '}
                <DefinitionLink
                  onDefinitionsToggle={() => {
                    setHighlightedDefinition('negative')
                  }}
                >
                  Definition
                </DefinitionLink>{' '}
              </>
            ),
            format: formatNumber,
          },
          {
            field: 'negativeIncrease',
            label: 'Negative (increase)',
            format: formatNumber,
          },
          {
            field: 'negativeIncrease',
            label: 'Negative (increase)',
            format: formatNumber,
          },
          {
            field: 'positive',
            label: (
              <>
                Positive (cumulative){' '}
                <DefinitionLink
                  onDefinitionsToggle={() => {
                    setHighlightedDefinition('positive')
                  }}
                >
                  Definition
                </DefinitionLink>{' '}
              </>
            ),
            format: formatNumber,
          },
          {
            field: 'positiveIncrease',
            label: 'Positive (increase)',
            format: formatNumber,
          },
          {
            field: 'positiveCasesViral',
            label: (
              <>
                Viral case positive (increase){' '}
                <DefinitionLink
                  onDefinitionsToggle={() => {
                    setHighlightedDefinition('positiveCasesViral')
                  }}
                >
                  Definition
                </DefinitionLink>{' '}
              </>
            ),
            format: formatNumber,
          },
          {
            field: 'positiveTestsViral',
            label: 'Viral test positive (increase)',
            format: formatNumber,
          },
          {
            field: 'totalTestResults',
            label: 'Total tests',
            format: formatNumber,
          },
          {
            field: 'totalTestsViral',
            label: 'Total viral tests',
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
        date
        negative
        negativeIncrease
        negativeTestsViral
        positive
        positiveCasesViral
        positiveIncrease
        positiveTestsViral
        totalTestResults
        totalTestResultsIncrease
        totalTestsViral
      }
    }

    allContentfulDataDefinition(
      filter: {
        fieldName: { in: ["negative", "positive", "positiveCasesViral"] }
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
