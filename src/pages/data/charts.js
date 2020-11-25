import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import { Row, Col } from '~components/common/grid'
import Container from '~components/common/container'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import ChartList from '~components/pages/data/charts/chart-list'
import ChartSparklines from '~components/pages/data/charts/sparklines'
import ChartTweet from '~components/pages/data/charts/tweet'
import ChartMap from '~components/pages/data/charts/map'

const ChartsPage = ({ data }) => (
  <Layout title="Charts" returnLinks={[{ link: '/data' }]}>
    <h2>United States Overview</h2>
    <Row>
      <Col width={[4, 6, 4]}>
        <ChartSparklines history={data.allCovidUsDaily.nodes} />
      </Col>

      <Col width={[4, 6, 8]} paddingLeft={[0, 0, 32]}>
        <ChartMap
          history={data.allCovidStateDaily.nodes}
          current={data.allCovidState.nodes}
        />
      </Col>
    </Row>
    <ChartTweet />
    <ChartList />

    <Container centered>
      <LongContent>
        <ContentfulContent
          content={
            data.contentfulSnippet.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.contentfulSnippet.contentful_id}
        />
      </LongContent>
    </Container>
  </Layout>
)

export default ChartsPage

export const query = graphql`
  query($fourteenDaysAgo: Date) {
    contentfulSnippet(slug: { eq: "chart-page-content" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allCovidUsDaily(
      sort: { fields: date }
      filter: { date: { gte: $fourteenDaysAgo } }
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
