import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import BlogTeaserList from '~components/pages/blog/blog-teaser-list'

export default ({ data, path }) => (
  <Layout
    title={`Blog: ${data.contentfulBlogCategory.name}`}
    path={path}
    narrow
  >
    <BlogTeaserList items={data.allContentfulBlogPost.nodes} />
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
      nodes {
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
`
