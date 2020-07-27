import React from 'react'
import { graphql } from 'gatsby'
import TableauChart from '~components/charts/tableau'
import ChartList from '~components/pages/data/charts/chart-list'
import Layout from '../components/layout'

const ChartPage = ({ data, path }) => {
  const chart = data.contentfulChart
  return (
    <Layout
      title={chart.title}
      path={path}
      returnLinks={[{ link: '/data/charts', title: 'All charts' }]}
    >
      <div
        className="a11y-only"
        dangerouslySetInnerHTML={{
          __html:
            chart.childContentfulChartAccessibleDescriptionTextNode
              .childMarkdownRemark.html,
        }}
      />
      {chart.chartProvider && chart.chartProvider === 'Tableau' && (
        <TableauChart
          id={chart.contentful_id}
          height={chart.height}
          viewUrl={chart.tableauViewUrl}
          viewUrlMobile={chart.tableauViewUrlMobile}
        />
      )}
      <ChartList />
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
      tableauViewUrl
      tableauViewUrlMobile
    }
  }
`
