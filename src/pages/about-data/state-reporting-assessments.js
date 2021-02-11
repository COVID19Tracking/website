/* eslint-disable */
import React from 'react'
import { graphql, Link } from 'gatsby'
import { FormatDate } from '~components/utils/format'
import Layout from '~components/layout'
import Container from '~components/common/container'
import ContentfulContent from '~components/common/contentful-content'
import { Table, Th, Td } from '~components/common/table'

const adjectives = {
  1: 'Serious',
  2: 'Some',
  3: 'Few',
}

const StateReportingAssessmentPage = ({ data }) => {
  const assessments = data.allCovidGradeStateAssessment.nodes

  const AssessmentRow = ({ state }) => {
    if (
      data.allCovidGradeExcludedStates.nodes.find(
        node => node.state === state.state,
      )
    ) {
      return null
    }
    const assessment = assessments.find(
      assessment => assessment.state === state.state,
    )
    return (
      <tr>
        <Td alignLeft>
          <Link to={`/data/state/${state.childSlug.slug}/assessment`}>
            {state.name}
          </Link>
        </Td>
        <Td alignLeft isFirst>
          {assessment ? (
            <Link
              to={`/data/state/${state.childSlug.slug}/assessment#state-metrics`}
            >
              {adjectives[assessment.taco]} issues exist
            </Link>
          ) : (
            <>N/A</>
          )}
        </Td>

        <Td alignLeft>
          {assessment ? (
            <Link
              to={`/data/state/${state.childSlug.slug}/assessment#race-ethnicity`}
            >
              {adjectives[assessment.crdt]} issues exist
            </Link>
          ) : (
            <>N/A</>
          )}
        </Td>

        <Td alignLeft>
          {assessment ? (
            <Link
              to={`/data/state/${state.childSlug.slug}/assessment#long-term-care`}
            >
              {adjectives[assessment.ltc]} issues exist
            </Link>
          ) : (
            <>N/A</>
          )}
        </Td>
      </tr>
    )
  }

  return (
    <Layout
      title="State Reporting Assessments"
      path="/about-data/state-reporting-assessments"
      description="For months, we have been collecting COVID-19 data, scrutinizing publicly available data definitions, and engaging in frequent conversations with jurisdictions to understand the data they share."
      returnLinks={[{ link: '/about-data' }]}
    >
      <Container centered>
        <ContentfulContent
          content={
            data.preamble.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.preamble.contentful_id}
        />
        <p>
          Last updated{' '}
          <strong>
            <FormatDate date={data.assessmentDate.date} format="LLLL d, yyyy" />
          </strong>
        </p>
      </Container>
      <Table>
        <thead>
          <tr>
            <Th alignLeft header>
              State
            </Th>
            <Th alignLeft header isFirst>
              State-level metrics
            </Th>
            <Th alignLeft header>
              Race and ethnicity data
            </Th>
            <Th alignLeft header>
              Long-term care data
            </Th>
          </tr>
        </thead>
        <tbody>
          {data.allCovidStateInfo.nodes.map(state => (
            <AssessmentRow key={state.state} state={state} />
          ))}
        </tbody>
      </Table>
    </Layout>
  )
}

export default StateReportingAssessmentPage

export const query = graphql`
  query {
    preamble: contentfulSnippet(slug: { eq: "state-assessment-landing" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        state
        name
        childSlug {
          slug
        }
      }
    }
    allCovidGradeStateAssessment {
      nodes {
        state
        taco
        ltc
        crdt
      }
    }
    allCovidGradeExcludedStates {
      nodes {
        state
      }
    }
    assessmentDate: covidGradeStateAssessment(date: { ne: null }) {
      date
    }
  }
`
