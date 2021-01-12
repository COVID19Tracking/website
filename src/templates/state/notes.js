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
      <p>
        When {state.name} reports no data, several days of data, or unusual data
        (such as decreases in values that should increase), our volunteers note
        it here on the date the anomaly occurred. We also note here changes in
        our own methodology that affect the data.
      </p>
      <StateNotes notes={covidStateInfo.notes} />
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
