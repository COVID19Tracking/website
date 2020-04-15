import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import DetailText from '../components/common/detail-text'

export default ({ data }) => {
  const blogPost = data.allContentfulBlogPost.edges[0].node
  return (
    <Layout title={blogPost.title} textHeavy>
      <DetailText>{blogPost.updatedAt}</DetailText>
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
          slug
          updatedAt(formatString: "MMMM D, YYYY")
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
