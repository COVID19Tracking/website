/* eslint-disable max-len */
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import ContentfulContent from '~components/common/contentful-content'
import Assessment from '~components/pages/state/assessment'
import LongContent from '~components/common/long-content'
import { FormatDate } from '~components/utils/format'

const StateAsessmentTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  const { allCovidGradeDataReportingProblems, contentfulSnippet } = data
  return (
    <Layout
      title={`${state.name} Assessment`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
      centered
      showWarning
    >
      <LongContent>
        <ContentfulContent
          id={contentfulSnippet.contentful_id}
          content={contentfulSnippet.childContentfulSnippetContentTextNode.childMarkdownRemark.html.replace(
            '{{NAME}}',
            state.name,
          )}
        />
      </LongContent>
      <p>
        Last updated{' '}
        <strong>
          <FormatDate date={data.assessmentDate.date} format="LLLL d, yyyy" />
        </strong>
      </p>
      <Assessment
        stateName={state.name}
        assessments={allCovidGradeDataReportingProblems.nodes}
      />
    </Layout>
  )
}

export default StateAsessmentTemplate

export const query = graphql`
  query($state: String!) {
    allCovidGradeDataReportingProblems(filter: { state: { eq: $state } }) {
      nodes {
        state
        text
        category
      }
    }
    contentfulSnippet(slug: { eq: "state-assessment-lede" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    assessmentDate: covidGradeStateAssessment(date: { ne: null }) {
      date
    }
  }
`
