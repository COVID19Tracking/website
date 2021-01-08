import React from 'react'
import { graphql } from 'gatsby'
import StateNotes from '~components/pages/state/state-notes'
import Layout from '~components/layout'

const StateNotesTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug

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
      <StateNotes notes={data.covidStateInfo.notes} />
    </Layout>
  )
}

export default StateNotesTemplate

export const query = graphql`
  query($state: String!) {
    covidStateInfo(state: { eq: $state }) {
      notes
    }
  }
`
