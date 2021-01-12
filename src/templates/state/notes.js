import React from 'react'
import { graphql } from 'gatsby'
import StateNotes from '~components/pages/state/state-notes'
import StatePreamble from '~components/pages/state/preamble'
import Layout from '~components/layout'

const StateNotesTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  const { covidState, covidStateInfo } = data
  return (
    <Layout
      title={`${state.name} Notes`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
      showWarning
    >
      <StatePreamble state={state} covidState={covidState} hideNotesLink />
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
      dataQualityGrade
    }
  }
`
