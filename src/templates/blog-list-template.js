import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import BlogTeaserList from '~components/pages/blog/blog-teaser-list'

export default ({ data }) => {
  /* eslint-disable  no-console */
  console.log(data)
  return (
    <Layout title="Blog" path="/blog" narrow>
      <BlogTeaserList items={data.allContentfulBlogPost.nodes} />
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { fields: publishDate, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
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
`
