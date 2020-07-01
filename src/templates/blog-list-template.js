import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import BlogTeaserList from '~components/pages/blog/blog-teaser-list'
import BlogNavigation from '~components/pages/blog/blog-pagination'

export default ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext

  return (
    <Layout title="Blog" path="/blog" narrow>
      <BlogTeaserList items={data.allContentfulBlogPost.nodes} />
      <BlogNavigation currentPage={currentPage} numPages={numPages} />
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
