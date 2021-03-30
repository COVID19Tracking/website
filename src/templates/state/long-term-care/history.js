import React from 'react'
import { graphql } from 'gatsby'
import StateNotes from '~components/pages/state/state-notes'
import TableResponsive from '~components/common/table-responsive'
import LongTermCareAlertNote from '~components/pages/state/long-term-care/alert-note'
import Layout from '~components/layout'

export default ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  const history = []

  data.aggregate.nodes.forEach(item => {
    const getValue = field => {
      let value = null
      Object.keys(item).forEach(key => {
        if (key.search(field) > -1) {
          if (value === null && item[key] !== null) {
            value = 0
          }
          if (item[key] !== null) {
            value += item[key]
          }
        }
      })
      return value
    }

    history.push({
      date: item.date,
      staffResidentCases: getValue('posresstaff_'),
      staffResidentDeaths: getValue('deathresstaff_'),
      staffCases: getValue('posstaff_'),
      staffDeaths: getValue('deathstaff_'),
      residentCases: getValue('posres_'),
      residentDeaths: getValue('deathres_'),
    })
  })
  history.forEach((item, key) => {
    if (!item.staffResidentCases && (item.staffCases || item.residentCases)) {
      history[key].staffResidentCases = item.staffCases + item.residentCases
    }
    if (
      !item.staffResidentDeaths &&
      (item.staffDeaths || item.residentDeaths)
    ) {
      history[key].staffResidentDeaths = item.staffDeaths + item.residentDeaths
    }
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
            field: 'residentCases',
            label: 'Resident Cases',
            isNumeric: true,
          },
          {
            field: 'residentDeaths',
            label: 'Resident Deaths',
            isNumeric: true,
          },
          {
            field: 'staffCases',
            label: 'Staff Cases',
            isNumeric: true,
          },
          {
            field: 'staffDeaths',
            label: 'Staff Deaths',
            isNumeric: true,
          },
          {
            field: 'staffResidentCases',
            label: 'Staff & Resident cases',
            isNumeric: true,
          },
          {
            field: 'staffResidentDeaths',
            label: 'Staff & Resident deaths',
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
        outbrkfac_other
        outbrkfac_nh
        outbrkfac_ltc
        outbrkfac_alf
        probdeathres_alf
        probdeathres_ltc
        probdeathres_nh
        probdeathres_other
        probdeathresstaff_alf
        probdeathresstaff_ltc
        probdeathresstaff_nh
        probdeathresstaff_other
        probdeathstaff_alf
        probdeathstaff_ltc
        probdeathstaff_nh
        probdeathstaff_other
        probposres_alf
        probposres_ltc
        probposres_nh
        probposres_other
        probposresstaff_alf
        probposresstaff_ltc
        probposresstaff_nh
        probposresstaff_other
        probposstaff_alf
        probposstaff_ltc
        probposstaff_nh
        probposstaff_other
      }
    }
  }
`
