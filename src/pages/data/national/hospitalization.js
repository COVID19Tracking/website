import React from 'react'
import { graphql, Link } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const NationalDataHospitalizationPage = ({ data }) => {
  return (
    <Layout
      title="National: Hospitalization"
      returnLinkTitle="Our Data"
      returnLink="/data"
      path="/data/national/hospitalization"
      returnLinks={[
        { link: '/data' },
        { link: `/data/national`, title: 'Totals for the US' },
      ]}
    >
      <Definitions
        definitions={data.allContentfulDataDefinition.nodes}
        order={[
          'hospitalizedCurrently',
          'inIcuCurrently',
          'onVentilatorCurrently',
        ]}
      />
      <p>
        We have{' '}
        <Link to="/about-data/faq#removed-national">
          removed cumulative hospitalization data for the US. Here&apos;s why
        </Link>
        .
      </p>
      <TableResponsive
        labels={[
          {
            field: 'date',
          },
          {
            field: 'hospitalizedCurrently',
            isNumeric: true,
          },
          {
            field: 'inIcuCurrently',
            isNumeric: true,
          },
          {
            field: 'onVentilatorCurrently',
            isNumeric: true,
          },
        ]}
        data={data.allCovidUsDaily.nodes}
      />
    </Layout>
  )
}

export default NationalDataHospitalizationPage

export const query = graphql`
  {
    allCovidUsDaily(sort: { fields: date, order: DESC }) {
      nodes {
        date(formatString: "MMM D, YYYY")
        hospitalizedCurrently
        inIcuCurrently
        onVentilatorCurrently
      }
    }
    allContentfulDataDefinition(
      sort: { fields: name }
      filter: {
        fieldName: {
          in: [
            "hospitalizedCurrently"
            "inIcuCurrently"
            "onVentilatorCurrently"
          ]
        }
      }
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
