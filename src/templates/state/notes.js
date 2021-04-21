import React from 'react'
import { graphql } from 'gatsby'
import StateNotes from '~components/pages/state/state-notes'
import StatePreamble from '~components/pages/state/preamble'
import Layout from '~components/layout'

const StateNotesTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  const {
    covidState,
    covidStateInfo,
    covidGradeStateAssessment,
    assessmentDate,
  } = data
  return (
    <Layout
      title={`${state.name} Notes`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
    >
      <StatePreamble
        state={state}
        covidState={covidState}
        assessment={covidGradeStateAssessment}
        assessmentDate={assessmentDate.date}
        hideNotesLink
      />
      <StateNotes stateName={state.name} notes={covidStateInfo.notes} />
    </Layout>
  )
}

export default StateNotesTemplate

export const query = graphql`
  query($state: String!) {
    covidStateInfo(state: { eq: $state }) {
      notes
    }
    covidState(state: { eq: $state }) {
      lastUpdateEt
      dateModified(formatString: "MMMM D, YYYY h:mm a")
    }
    covidGradeStateAssessment(state: { eq: $state }) {
      taco
      ltc
      crdt
    }
    assessmentDate: covidGradeStateAssessment(date: { ne: null }) {
      date
    }
  }
`
