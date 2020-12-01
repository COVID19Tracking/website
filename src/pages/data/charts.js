import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Container from '~components/common/container'
import ContentfulContent from '~components/common/contentful-content'
import ChartList from '~components/pages/data/charts/chart-list'
import ChartTweet from '~components/pages/data/charts/tweet'
import ChartPreamble from '~components/pages/data/charts/preamble'

const ChartsPage = ({ data }) => (
  <Layout title="Charts" returnLinks={[{ link: '/data' }]}>
    <h2>United States Overview</h2>
    <ChartPreamble
      usHistory={data.allCovidUsDaily.nodes}
      history={data.allCovidStateDaily.nodes}
      current={data.allCovidState.nodes}
    />
    <ContentfulContent
      content={
        data.chartDisclaimer.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.chartDisclaimer.contentful_id}
    />
    <ChartTweet />
    <ChartList />

    <Container centered>
      <ContentfulContent
        content={
          data.chartFooter.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.chartFooter.contentful_id}
      />
    </Container>
  </Layout>
)

export default ChartsPage

export const query = graphql`
  query($fourteenDaysAgo: Date, $twentyEightDaysAgo: Date) {
    chartFooter: contentfulSnippet(slug: { eq: "chart-page-content" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    chartDisclaimer: contentfulSnippet(slug: { eq: "chart-page-disclaimer" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allCovidUsDaily(
      sort: { fields: date }
      filter: { date: { gte: $twentyEightDaysAgo } }
    ) {
      nodes {
        hospitalizedCurrently
        deathIncrease
        date
        positiveIncrease
        totalTestResultsIncrease
      }
    }
    allCovidStateDaily(
      sort: { fields: date }
      filter: { date: { eq: $fourteenDaysAgo } }
    ) {
      nodes {
        state
        positive
      }
    }
    allCovidState {
      nodes {
        state
        positive
      }
    }
  }
`
