import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Byline from '../components/common/byline'

export default ({ data }) => (
  <Layout title="Blog" textHeavy>
    {data.allContentfulBlogPost.edges.map(({ node }) => (
      <>
        <h3>
          <Link to={`/blog/${node.slug}`}>{node.title}</Link>
        </h3>
        <Byline author={node.author} date={node.publishDate} />
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
    allContentfulBlogPost(sort: { fields: publishDate }) {
      edges {
        node {
          title
          slug
          author {
            name
          }
          publishDate(formatString: "MMMM D, YYYY")
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
