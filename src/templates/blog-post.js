import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Lede from '../components/common/blog-lede'

export default ({ data }) => {
  const blogPost = data.allContentfulBlogPost.edges[0].node
  return (
    <Layout title="Blog" titleLink="/blog" textHeavy narrow noMargin>
      <Lede
        headline={blogPost.title}
        author={blogPost.author}
        date={blogPost.publishDate}
        lede={blogPost.lede}
      />
      <div
        dangerouslySetInnerHTML={{
          __html:
            blogPost.childContentfulBlogPostBodyTextNode.childMarkdownRemark
              .html,
        }}
      />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    allContentfulBlogPost(filter: { id: { eq: $id } }) {
      edges {
        node {
          title
          author {
            name
            twitterLink
          }
          slug
          lede
          publishDate(formatString: "MMMM D, YYYY")
          childContentfulBlogPostBodyTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
