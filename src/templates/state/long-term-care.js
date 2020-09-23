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
      {data.cumulative.nodes.length ? (
        <>
          <LongTermCareOverview
            facilities={data.allCovidLtcFacilities.nodes.length}
            overview={data.cumulative.nodes[0]}
          />
          <LongTermCareAlertNote>An alert note.</LongTermCareAlertNote>
          <h2 id="summary">Summary</h2>
          <LongTermCareSummaryTable
            cumulative={data.cumulative.nodes[0]}
            outbreak={data.outbreak.nodes[0]}
          />
          <h2 id="notes">State notes</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: marked(data.covidLtcNotes.notes),
            }}
          />
          <h2 id="facilities">Facilities</h2>
          <LongTermCareFacilities
            facilities={data.allCovidLtcFacilities.nodes}
          />
        </>
      ) : (
        <LongTermCareAlertNote>
          {state.name} does not report long-term care data.
        </LongTermCareAlertNote>
      )}
    </Layout>
  )
}

export const query = graphql`
  query($state: String!) {
    cumulative: allCovidLtcStates(
      sort: { fields: date, order: DESC }
      filter: { state_abbr: { eq: $state }, data_type: { eq: "Aggregate" } }
      limit: 1
    ) {
      nodes {
        date
        posstaff_other
        posstaff_nh
        posstaff_ltc
        posstaff_alf
        posres_other
        posres_nh
        posres_ltc
        posres_alf
        posresstaff_other
        posresstaff_nh
        posresstaff_ltc
        posresstaff_alf
        deathstaff_other
        deathstaff_nh
        deathstaff_ltc
        deathstaff_alf
        deathres_other
        deathres_nh
        deathres_ltc
        deathres_alf
        deathresstaff_other
        deathresstaff_nh
        deathresstaff_ltc
        deathresstaff_alf
        data_type
      }
    }
    outbreak: allCovidLtcStates(
      sort: { fields: date, order: DESC }
      filter: { state_abbr: { eq: $state }, data_type: { eq: "Outbreak" } }
      limit: 1
    ) {
      nodes {
        date
        posstaff_other
        posstaff_nh
        posstaff_ltc
        posstaff_alf
        posres_other
        posres_nh
        posres_ltc
        posres_alf
        posresstaff_other
        posresstaff_nh
        posresstaff_ltc
        posresstaff_alf
        deathstaff_other
        deathstaff_nh
        deathstaff_ltc
        deathstaff_alf
        deathres_other
        deathres_nh
        deathres_ltc
        deathres_alf
        deathresstaff_other
        deathresstaff_nh
        deathresstaff_ltc
        deathresstaff_alf
        data_type
      }
    }
    covidLtcNotes(state: { eq: $state }) {
      notes
    }
    allCovidLtcFacilities(
      sort: { fields: name }
      filter: {
        state: { eq: $state }
        resident_positive: { gt: 0 }
        resident_deaths: { gt: 0 }
      }
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
