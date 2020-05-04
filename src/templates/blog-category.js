import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import BlogTeaserList from '../components/pages/blog/blog-teaser-list'

export default ({ data }) => (
  <Layout
    title={`Blog: ${data.allContentfulBlogCategory.edges[0].node.name}`}
    textHeavy
    narrow
  >
    <BlogTeaserList items={data.allContentfulBlogPost.edges} />
  </Layout>
)

export const query = graphql`
  query($id: String!) {
    allContentfulBlogCategory(filter: { id: { eq: $id } }) {
      edges {
        node {
          name
        }
      }
    }
    allContentfulBlogPost(
      sort: { fields: publishDate, order: DESC }
      filter: { categories: { elemMatch: { id: { eq: $id } } } }
    ) {
      edges {
        node {
          title
          slug
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
          publishDate(formatString: "MMMM D, YYYY")
          lede {
            lede
          }
        }
      }
    }
  }
`
