import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Container from '~components/common/container'
import ContentfulContent from '~components/common/contentful-content'
import ChartList from '~components/pages/data/charts/chart-list'
import ChartPreamble from '~components/pages/data/charts/preamble'

const ChartsPage = ({ data }) => (
  <Layout title="Charts" returnLinks={[{ link: '/data' }]} showWarning>
    <Container centered>
      <ContentfulContent
        content={
          data.chartDisclaimer.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.chartDisclaimer.contentful_id}
      />
    </Container>
    <h2>United States Overview</h2>
    <ChartPreamble
      usHistory={data.allCovidUsDaily.nodes}
      stateHistory={data.allCovidStateDaily.nodes}
    />

    <h2>Our chart gallery</h2>
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
  query($twentyEightDaysAgo: Date) {
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
      sort: { order: DESC, fields: date }
      filter: { date: { gte: $twentyEightDaysAgo } }
    ) {
      nodes {
        state
        positiveIncrease
      }
    }
  }
`
