import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '~components/layout'
import MarkdownContent from '~components/common/markdown-content'

export default ({ data }) => (
  <Layout title="Charts" narrow returnLink="/data" returnLinkTitle="Our Data">
    <p>Charts!</p>
    {data.allContentfulChartCategory.nodes.map(({ name, chart }) => (
      <>
        {chart && chart.length > 0 && (
          <>
            <h2>{name}</h2>
            {chart.map(item => (
              <>
                <h3>
                  <Link to={`/data/charts/${item.slug}`}>{item.title}</Link>
                </h3>
                {item.childContentfulChartDescriptionTextNode && (
                  <MarkdownContent
                    html={
                      item.childContentfulChartDescriptionTextNode
                        .childMarkdownRemark.html
                    }
                  />
                )}
              </>
            ))}
          </>
        )}
      </>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allContentfulChartCategory(
      sort: { fields: [name, chart___title], order: ASC }
    ) {
      nodes {
        chart {
          title
          slug
          childContentfulChartDescriptionTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
        name
        slug
      }
    }
  }
`
