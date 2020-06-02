import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import BlogTeaserList from '~components/pages/blog/blog-teaser-list'

export default ({ data }) => (
  <Layout title="Blog" path="/blog" textHeavy narrow>
    <BlogTeaserList items={data.allContentfulBlogPost.edges} />
  </Layout>
)

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
      edges {
        node {
          title
          slug
          authors {
            name
            twitterLink
            link
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
