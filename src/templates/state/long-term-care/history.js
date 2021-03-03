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
    let staffCases = 0
    let staffDeaths = 0
    let residentCases = 0
    let residentDeaths = 0
    Object.keys(item).forEach(key => {
      if (key.search('posres') > -1) {
        residentCases += item[key]
      }
      if (key.search('posstaff') > -1) {
        staffCases += item[key]
      }
      if (key.search('deathres') > -1) {
        residentDeaths += item[key]
      }
      if (key.search('deathstaff') > -1) {
        staffDeaths += item[key]
      }
    })
    history.push({
      date: item.date,
      cases: staffCases + residentCases,
      deaths: staffDeaths + residentDeaths,
      staffCases,
      staffDeaths,
      residentCases,
      residentDeaths,
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
            field: 'cases',
            label: 'Total Cases',
            isNumeric: true,
          },
          {
            field: 'deaths',
            label: 'Total Deaths',
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
      }
    }
  }
`
