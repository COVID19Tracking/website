import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'

const DataSummaryPage = ({ data }) => (
  <Layout title="Data Summary">
    <p>[Lede content TK]</p>
    {data.allContentfulDataSummary.nodes.map(summary => (
      <div key={summary.slug} id={summary.slug}>
        <h3>{summary.title}</h3>
        <p>
          <strong>
            <a href={summary.sourceLink}>Data source</a>
          </strong>
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
              summary.childContentfulDataSummaryUseTextNode.childMarkdownRemark
                .html,
          }}
        />
      </div>
    ))}
  </Layout>
)

export default DataSummaryPage

export const query = graphql`
  {
    allContentfulDataSummary {
      nodes {
        title
        slug
        sourceLink
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
`
