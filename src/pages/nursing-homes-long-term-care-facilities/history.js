import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Layout from '~components/layout'
import ContentfulContent from '~components/common/contentful-content'

export default ({ path, data }) => {
  const history = {}

  data.aggregate.nodes.forEach(item => {
    if (typeof history[item.isoDate] === 'undefined') {
      history[item.isoDate] = {
        date: item.date,
        sort: item.isoDate,
        cases: 0,
        deaths: 0,
        facilities: 0,
      }
    }
    Object.keys(item).forEach(key => {
      if (key.search(/posres|posstaff/) > -1) {
        history[item.isoDate].cases += item[key]
      }
      if (key.search(/deathres|deathstaff/) > -1) {
        history[item.isoDate].deaths += item[key]
      }
      if (key.search('outbrkfac') > -1) {
        history[item.isoDate].facilities += item[key]
      }
    })
  })
  return (
    <Layout
      title="Week-by-week Summary Totals"
      returnLinks={[{ link: '/nursing-homes-long-term-care-facilities' }]}
      path={path}
    >
      <ContentfulContent
        id={data.contentfulSnippet.contentful_id}
        content={
          data.contentfulSnippet.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
      />
      <TableResponsive
        labels={[
          {
            field: 'date',
            label: 'Date',
          },

          {
            field: 'cases',
            label: 'Cases',
            isNumeric: true,
          },
          {
            field: 'deaths',
            label: 'Deaths',
            isNumeric: true,
          },
          {
            field: 'facilities',
            label: 'Facilities tracked',
            isNumeric: true,
          },
        ]}
        data={Object.values(history).sort((a, b) => (a.sort < b.sort ? 1 : -1))}
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "ltc-history-lede" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    aggregate: allCovidLtcStates(
      sort: { fields: date, order: DESC }
      filter: { data_type: { eq: "Aggregate" } }
    ) {
      nodes {
        date(formatString: "MMMM D, YYYY")
        isoDate: date
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
        outbrkfac_other
        outbrkfac_nh
        outbrkfac_ltc
        outbrkfac_alf
        probposstaff_other
        probposstaff_nh
        probposstaff_ltc
        probposstaff_alf
        probposresstaff_other
        probposresstaff_nh
        probposresstaff_ltc
        probposresstaff_alf
        probposres_other
        probposres_nh
        probposres_ltc
        probposres_alf
        probdeathstaff_other
        probdeathstaff_nh
        probdeathstaff_ltc
        probdeathstaff_alf
        probdeathresstaff_other
        probdeathresstaff_nh
        probdeathresstaff_ltc
        probdeathresstaff_alf
        probdeathres_other
        probdeathres_nh
        probdeathres_ltc
        probdeathres_alf
        data_type
      }
    }
  }
`
