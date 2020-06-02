import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import BlogTeaserList from '~components/pages/blog/blog-teaser-list'

export default ({ data, path }) => (
  <Layout
    title={`Blog: ${data.contentfulBlogCategory.name}`}
    path={path}
    textHeavy
    narrow
  >
    <BlogTeaserList items={data.allContentfulBlogPost.edges} />
  </Layout>
)

export const query = graphql`
  query($id: String!) {
    contentfulBlogCategory(id: { eq: $id }) {
      name
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
