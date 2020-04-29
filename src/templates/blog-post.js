import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Lede from '../components/pages/blog/blog-lede'
import Categories from '../components/pages/blog/categories'

export default ({ data }) => {
  const blogPost = data.allContentfulBlogPost.edges[0].node
  return (
    <Layout title="Blog" titleLink="/blog" textHeavy narrow noMargin>
      <Categories categories={blogPost.categories} />
      <Lede
        headline={blogPost.title}
        authors={blogPost.authors}
        date={blogPost.publishDate}
        lede={blogPost.lede.lede}
      />
      <div
        className="module-content"
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
          authors {
            name
            twitterLink
            headshot {
              file {
                fileName
              }
              resize(width: 100) {
                width
                height
                src
              }
            }
          }
          categories {
            name
            slug
          }
          slug
          lede {
            lede
          }
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
