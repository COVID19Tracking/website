import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Assessment from '~components/pages/state/assessment'

const StateAsessmentTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  const { allCovidGradeDataReportingProblems } = data
  return (
    <Layout
      title={`${state.name} Assessment`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
      showWarning
    >
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
  }
`
