import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'

const categoryOrder = [
  'testing-outcomes-data',
  'long-term-care-datasets',
  'vaccine-metadata',
  'city-data',
  'miscellaneous-repositories',
]

const DataSummaryPage = ({ data }) => {
  const categories = categoryOrder.map(slug =>
    data.allContentfulDataSummaryCategory.nodes.find(
      node => node.slug === slug,
    ),
  )
  return (
    <Layout title="Data Summary">
      <p>[Lede content TK]</p>
      {categories.map(({ title, summaries }) => (
        <>
          <h2>{title}</h2>
          {summaries.map(summary => (
            <div key={summary.slug} id={summary.slug}>
              <h3>{summary.title}</h3>
              <p>
                <strong>
                  <a href={summary.sourceLink}>Data source</a>
                </strong>
                {summary.downloadLink && (
                  <>
                    {' | '}
                    <strong>
                      <a href={summary.downloadLink}>Download data</a>
                    </strong>
                  </>
                )}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    summary.childContentfulDataSummaryDescriptionTextNode
                      .childMarkdownRemark.html,
                }}
              />
              <h4>How to use it</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    summary.childContentfulDataSummaryUseTextNode
                      .childMarkdownRemark.html,
                }}
              />
            </div>
          ))}
        </>
      ))}
    </Layout>
  )
}

export default DataSummaryPage

export const query = graphql`
  {
    allContentfulDataSummaryCategory {
      nodes {
        title
        slug
        summaries {
          title
          slug
          sourceLink
          downloadLink
          childContentfulDataSummaryUseTextNode {
            childMarkdownRemark {
              html
            }
          }
          childContentfulDataSummaryDescriptionTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
