import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import DetailText from '../components/common/detail-text'

export default ({ data }) => (
  <Layout title="Blog">
    {data.allContentfulBlogPost.edges.map(({ node }) => (
      <>
        <h3>
          <Link to={`/blog/${node.slug}`}>{node.title}</Link>
        </h3>
        <DetailText>
          <strong>Posted on:</strong>
          {node.updatedAt}
        </DetailText>
        <div
          dangerouslySetInnerHTML={{
            __html:
              node.childContentfulBlogPostTeaserTextNode.childMarkdownRemark
                .html,
          }}
        />
      </>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: updatedAt }) {
      edges {
        node {
          title
          slug
          updatedAt(formatString: "MMMM D, YYYY")
          childContentfulBlogPostTeaserTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
