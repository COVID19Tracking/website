import React from 'react'
import { graphql } from 'gatsby'
import StateNotes from '~components/pages/state/state-notes'
import TableResponsive from '~components/common/table-responsive'
import LongTermCareAlertNote from '~components/pages/state/long-term-care/alert-note'
import Layout from '~components/layout'

const categories = ['nh', 'ltc', 'alf', 'other']

export default ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  const history = []
  console.log(data.aggregate.nodes)
  data.aggregate.nodes.forEach(item => {
    const getValue = field => {
      let value = null
      categories.forEach(category => {
        if (item[`prob${field}_${category}`]) {
          value += item[`prob${field}_${category}`]
        }
        if (item[`${field}_${category}`]) {
          value += item[`${field}_${category}`]
        }
        if (field === 'posresstaff' && !item[`posresstaff_${category}`]) {
          const fieldList = ['posres', 'posstaff', 'probposres', 'probposstaff']
          fieldList.forEach(fieldItem => {
            if (item[`${fieldItem}_${category}`] !== null) {
              value += item[`${fieldItem}_${category}`]
            }
          })
        }
        if (field === 'deathresstaff' && !item[`deathresstaff_${category}`]) {
          const fieldList = [
            'deathres',
            'deathstaff',
            'probdeathres',
            'probdeathstaff',
          ]
          fieldList.forEach(fieldItem => {
            if (item[`${fieldItem}_${category}`] !== null) {
              value += item[`${fieldItem}_${category}`]
            }
          })
        }
      })

      return value
    }

    history.push({
      date: item.date,
      staffResidentCases: getValue('posresstaff'),
      staffResidentDeaths: getValue('deathresstaff'),
      staffCases: getValue('posstaff'),
      staffDeaths: getValue('deathstaff'),
      residentCases: getValue('posres'),
      residentDeaths: getValue('deathres'),
      facilities: getValue('outbrkfac'),
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
          {
            field: 'facilities',
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
