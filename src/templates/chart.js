import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Container from '~components/common/container'
import LongContent from '~components/common/long-content'
import TableauChart from '~components/charts/tableau'
import Layout from '../components/layout'

const ChartPage = ({ data, path }) => {
  const chart = data.contentfulChart
  return (
    <Layout
      title={chart.title}
      path={path}
      returnLink="/data/charts"
      returnLinkTitle="All charts"
    >
      <Container narrow>
        <LongContent>
          {chart.childContentfulChartDescriptionTextNode && (
            <ContentfulContent
              content={
                chart.childContentfulChartDescriptionTextNode
                  .childMarkdownRemark.html
              }
              id={chart.contentful_id}
            />
          )}
          <div
            className="a11y-only"
            dangerouslySetInnerHTML={{
              __html:
                chart.childContentfulChartAccessibleDescriptionTextNode
                  .childMarkdownRemark.html,
            }}
          />
        </LongContent>
      </Container>
      <Container>
        {chart.chartProvider && chart.chartProvider === 'Tableau' && (
          <TableauChart
            id={chart.contentful_id}
            height={chart.height}
            viewUrl={chart.tableauViewUrl}
          />
        )}
      </Container>
    </Layout>
  )
}

export default ChartPage

export const query = graphql`
  query($id: String!) {
    contentfulChart(id: { eq: $id }) {
      title
      slug
      contentful_id
      height
      childContentfulChartAccessibleDescriptionTextNode {
        childMarkdownRemark {
          html
        }
      }
      chartProvider
      category {
        name
        slug
      }
      tableauViewUrl
      childContentfulChartDescriptionTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
