import React from 'react'
import { graphql } from 'gatsby'
import StateNotes from '~components/pages/state/state-notes'
import TableResponsive from '~components/common/table-responsive'
import LongTermCareAlertNote from '~components/pages/state/long-term-care/alert-note'
import Layout from '~components/layout'
import getTotals from '~utilities/ltc-totals'

export default ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  const history = []

  data.aggregate.nodes.forEach(item => {
    const { totalCases, totalDeath, totalFacilities } = getTotals(item)
    history.push({
      date: item.date,
      totalCases,
      totalDeath,
      totalFacilities,
    })
  })

  return (
    <Layout
      title={`${state.name}: Long-term-care historical data`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
        { link: `/data/state/${slug}/long-term-care`, title: 'Long-term care' },
      ]}
      path={path}
    >
      {data.covidLtcNotes.alerts && (
        <LongTermCareAlertNote>
          {data.covidLtcNotes.alerts}
        </LongTermCareAlertNote>
      )}
      <StateNotes hideLede notes={data.covidLtcNotes.notes} />
      <TableResponsive
        labels={[
          {
            field: 'date',
            label: 'Date',
            alignLeft: true,
          },
          {
            field: 'totalCases',
            label: 'Total Cases',
            isNumeric: true,
          },
          {
            field: 'totalDeath',
            label: 'Total Deaths',
            isNumeric: true,
          },
          {
            field: 'totalFacilities',
            label: 'Facilities impacted',
            isNumeric: true,
          },
        ]}
        data={history}
      />
    </Layout>
  )
}

export const query = graphql`
  query($state: String!) {
    covidLtcNotes(state: { eq: $state }) {
      notes
      alerts
    }
    aggregate: allCovidLtcStates(
      sort: { fields: date, order: DESC }
      filter: { state_abbr: { eq: $state }, data_type: { eq: "Aggregate" } }
    ) {
      nodes {
        date(formatString: "MMMM D, YYYY")
        posstaff_other
        posstaff_lumpedother
        posstaff_nh
        posstaff_ltc
        posstaff_alf
        posres_other
        posres_lumpedother
        posres_nh
        posres_ltc
        posres_alf
        posresstaff_other
        posresstaff_lumpedother
        posresstaff_nh
        posresstaff_ltc
        posresstaff_alf
        deathstaff_other
        deathstaff_lumpedother
        deathstaff_nh
        deathstaff_ltc
        deathstaff_alf
        deathres_other
        deathres_lumpedother
        deathres_nh
        deathres_ltc
        deathres_alf
        deathresstaff_other
        deathresstaff_lumpedother
        deathresstaff_nh
        deathresstaff_ltc
        deathresstaff_alf
        data_type
        outbrkfac_other
        outbrkfac_lumpedother
        outbrkfac_nh
        outbrkfac_ltc
        outbrkfac_alf
        probdeathres_alf
        probdeathres_ltc
        probdeathres_nh
        probdeathres_other
        probdeathres_lumpedother
        probdeathresstaff_alf
        probdeathresstaff_ltc
        probdeathresstaff_nh
        probdeathresstaff_other
        probdeathresstaff_lumpedother
        probdeathstaff_alf
        probdeathstaff_ltc
        probdeathstaff_nh
        probdeathstaff_other
        probdeathstaff_lumpedother
        probposres_alf
        probposres_ltc
        probposres_nh
        probposres_other
        probposres_lumpedother
        probposresstaff_alf
        probposresstaff_ltc
        probposresstaff_nh
        probposresstaff_other
        probposresstaff_lumpedother
        probposstaff_alf
        probposstaff_ltc
        probposstaff_nh
        probposstaff_other
        probposstaff_lumpedother
      }
    }
  }
`
