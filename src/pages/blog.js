import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Container from '~components/common/container'
import BlogTeaserList from '~components/pages/blog/blog-teaser-list'
import BlogCategoriesList from '~components/pages/blog/blog-categories-list'
import blogStyles from '~components/pages/blog/blog.module.scss'

export default ({ data }) => (
  <Layout title="Blog" path="/blog">
    <Container className={blogStyles.container}>
      <BlogCategoriesList />
      <BlogTeaserList items={data.allContentfulBlogPost.nodes} />
    </Container>
  </Layout>
)

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
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
