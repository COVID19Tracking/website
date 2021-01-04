import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Container from '~components/common/container'
import BlogTeaserList from '~components/pages/blog/blog-teaser-list'
import BlogCategoriesList from '~components/pages/blog/blog-categories-list'
import blogStyles from '~components/pages/blog/blog.module.scss'

const BlogCategoryTemplate = ({ data, path }) => (
  <Layout
    title={`Analysis & updates: ${data.contentfulBlogCategory.name}`}
    returnLinks={[{ link: '/analysis-updates', title: 'All Posts' }]}
    path={path}
    centerTitle
  >
    <Container className={blogStyles.container}>
      <BlogCategoriesList />
      <BlogTeaserList items={data.allContentfulBlogPost.nodes} />
    </Container>
  </Layout>
)

export default BlogCategoryTemplate

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
