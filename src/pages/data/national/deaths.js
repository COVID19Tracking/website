import React from 'react'
import { graphql, Link } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const NationalDataDeathsPage = ({ data }) => {
  return (
    <Layout
      title="National Data: Deaths"
      returnLinkTitle="Our Data"
      returnLink="/data"
      path="/data/national/deaths"
      description="COVID deaths numbers in the US for each day from January 2020 to the present."
      returnLinks={[
        { link: '/data' },
        { link: `/data/national`, title: 'Totals for the US' },
      ]}
    >
      <Definitions
        definitions={data.allContentfulDataDefinition.nodes}
        order={['death']}
      />
      <p>
        We have{' '}
        <Link to="/about-data/faq#why-have-you-stopped-reporting-national-recoveries">
          removed recovered data for the US. Here&apos;s why
        </Link>
        .
      </p>
      <TableResponsive
        labels={[
          {
            field: 'date',
          },
          {
            field: 'death',
            isNumeric: true,
          },
          {
            field: 'deathIncrease',
            isNumeric: true,
          },
        ]}
        data={data.allCovidUsDaily.nodes}
      />
    </Layout>
  )
}

export default NationalDataDeathsPage

export const query = graphql`
  {
    allCovidUsDaily(sort: { fields: date, order: DESC }) {
      nodes {
        date(formatString: "MMMM D, YYYY")
        death
        deathIncrease
      }
    }
    allContentfulDataDefinition(
      sort: { fields: name }
      filter: { fieldName: { in: ["death"] } }
    ) {
      nodes {
        name
        fieldName
        childContentfulDataDefinitionDefinitionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
