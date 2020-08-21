import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import Layout from '~components/layout'

export default ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  return (
    <Layout
      title={`${state.name}: Long-term care`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
    >
      <div
        dangerouslySetInnerHTML={{ __html: marked(data.covidLtcNotes.notes) }}
      />
    </Layout>
  )
}

export const query = graphql`
  query($state: String!) {
    allCovidLtcStates(
      sort: { fields: Date, order: DESC }
      limit: 1
      filter: { State_Abbr: { eq: $state } }
    ) {
      nodes {
        Date
        outbrkFacil_other
        outbrkFacil_nh
        outbrkFacil_ltc
        outbrkFacil_alf
        PosStaff_other
        PosStaff_nh
        PosStaff_ltc
        PosStaff_alf
        PosRes_other
        PosRes_nh
        PosRes_ltc
        PosRes_alf
        PosResStaff_other
        PosResStaff_nh
        PosResStaff_ltc
        PosResStaff_alf
        DeathStaff_other
        DeathStaff_nh
        DeathStaff_ltc
        DeathStaff_alf
        DeathRes_other
        DeathRes_nh
        DeathRes_ltc
        DeathRes_alf
        DeathResStaff_other
        DeathResStaff_nh
        DeathResStaff_ltc
        DeathResStaff_alf
      }
    }
    covidLtcNotes(state: { eq: $state }) {
      notes
    }
  }
`
