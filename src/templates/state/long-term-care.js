import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import LongTermCareSummaryTable from '~components/pages/state/long-term-care/summary-table'
import LongTermCareFacilities from '~components/pages/state/long-term-care/facilities'
import LongTermCareOverview from '~components/pages/state/long-term-care/overview'
import LongTermCareAlertNote from '~components/pages/state/long-term-care/alert-note'
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
      <LongTermCareOverview
        facilities={data.allCovidLtcFacilities.nodes.length}
        overview={data.allCovidLtcStates.nodes[0]}
      />
      <LongTermCareAlertNote />
      <h2 id="summary">Summary</h2>
      <LongTermCareSummaryTable data={data.allCovidLtcStates.nodes[0]} />
      <h2 id="notes">State notes</h2>
      <div
        dangerouslySetInnerHTML={{ __html: marked(data.covidLtcNotes.notes) }}
      />
      <h2 id="facilities">Facilities</h2>
      <LongTermCareFacilities facilities={data.allCovidLtcFacilities.nodes} />
    </Layout>
  )
}

export const query = graphql`
  query($state: String!) {
    allCovidLtcStates(
      sort: { fields: Date, order: DESC }
      filter: { State_Abbr: { eq: $state } }
      limit: 1
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
    allCovidLtcFacilities(
      sort: { fields: name }
      filter: { state: { eq: "CA" } }
    ) {
      nodes {
        name
        type
        county
        resident_positive
        resident_deaths
      }
    }
  }
`
