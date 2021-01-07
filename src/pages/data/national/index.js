import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'
import { FormatNumber } from '~components/utils/format'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import { DownloadData } from '~components/pages/state/download-data'

const formatNumber = number => <FormatNumber number={number} />

const NationalDataPage = ({ data }) => (
  <Layout
    title="Totals for the US"
    path="/data/national"
    returnLinks={[{ link: '/data' }]}
    socialCard={{
      description: 'Cumulative record of our daily totals.',
    }}
  >
    <ContentfulContent
      content={
        data.contentfulSnippet.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.contentfulSnippet.contentful_id}
    />
    <DownloadData slug="national" />

    <Definitions
      definitions={data.allContentfulDataDefinition.nodes}
      order={[
        'states',
        'totalTestResultsIncrease',
        'positive',
        'negative',
        'hospitalizedCurrently',
        'death',
        'totalTestResults',
      ]}
    />
    <TableResponsive
      labels={[
        {
          field: 'date',
          noWrap: true,
        },
        {
          field: 'states',
          label: 'State (or territory)',
          format: formatNumber,
        },
        { field: 'totalTestResultsIncrease', format: formatNumber },
        { field: 'positive', format: formatNumber },
        { field: 'negative', format: formatNumber },
        { field: 'hospitalizedCurrently', format: formatNumber },
        { field: 'death', format: formatNumber },
        { field: 'totalTestResults', format: formatNumber },
      ]}
      data={data.allCovidUsDaily.nodes}
    />
  </Layout>
)

export default NationalDataPage

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "us-daily" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allCovidUsDaily(sort: { order: DESC, fields: date }) {
      nodes {
        date(formatString: "MMMM D, YYYY")
        death

        hospitalizedCurrently
        negative
        positive
        states
        totalTestResults
        totalTestResultsIncrease
      }
    }
    allContentfulDataDefinition(
      sort: { fields: name }
      filter: {
        fieldName: {
          in: [
            "states"
            "totalTestResultsIncrease"
            "positive"
            "negative"
            "totalTestResults"
            "hospitalizedCurrently"
            "death"
            "totalTestResults"
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
