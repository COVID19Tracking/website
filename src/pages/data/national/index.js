import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'
import { FormatDate, FormatNumber } from '~components/utils/format'
import TableResponsive from '~components/common/table-responsive'
import { DownloadData } from '~components/pages/state/download-data'

const formatNumber = number => <FormatNumber number={number} />

const ContentPage = ({ data }) => (
  <Layout
    title="US Historical Data"
    path="/data/us-daily"
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

    <TableResponsive
      labels={[
        {
          field: 'date',
          format: date => <FormatDate date={date} format="ccc LLL d yyyy" />,
        },
        {
          field: 'states',
          label: 'State (or territory)',
          format: formatNumber,
        },
        { field: 'totalTestResultsIncrease' },
        { field: 'positive' },
        { field: 'negative' },
        { field: 'hospitalized' },
        { field: 'hospitalizedCurrently' },
        { field: 'death' },
        { field: 'recovered' },
        { field: 'totalTestResults' },
      ]}
      data={data.allCovidUsDaily.nodes}
    />
  </Layout>
)

export default ContentPage

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
        totalTestResults
        totalTestResultsIncrease
        hospitalizedCurrently
        states
        positive
        pending
        negative
        hospitalized
        death
        date
        recovered
      }
    }
  }
`
