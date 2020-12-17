import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Layout from '~components/layout'

export default ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug
  const history = []

  data.aggregate.nodes.forEach(item => {
    let cases = 0
    let deaths = 0
    Object.keys(item).forEach(key => {
      if (key.search(/posres|posstaff/) > -1) {
        cases += item[key]
      }
      if (key.search(/deathres|deathstaff/) > -1) {
        deaths += item[key]
      }
    })
    history.push({
      date: item.date,
      cases,
      deaths,
    })
  })
  return (
    <Layout
      title={`${state.name}: Long-term care history`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
    >
      <TableResponsive
        labels={[
          {
            field: 'date',
            label: 'Date',
          },
          {
            field: 'cases',
            label: 'Cases',
          },
          {
            field: 'deaths',
            label: 'Deaths',
          },
        ]}
        data={history}
      />
    </Layout>
  )
}

export const query = graphql`
  query($state: String!) {
    aggregate: allCovidLtcStates(
      sort: { fields: date, order: DESC }
      filter: { state_abbr: { eq: $state }, data_type: { eq: "Aggregate" } }
    ) {
      nodes {
        date(formatString: "MMM D, YYYY")
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
