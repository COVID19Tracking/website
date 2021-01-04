import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Container from '~components/common/container'
import BlogCategoriesList from '~components/pages/blog/blog-categories-list'
import BlogTeaserList from '~components/pages/blog/blog-teaser-list'
import BlogPagination from '~components/pages/blog/blog-pagination'
import blogStyles from '~components/pages/blog/blog.module.scss'

const BlogPageTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const title = isFirst
    ? 'Analysis & updates'
    : `Analysis & updates – Page ${currentPage}`

  return (
    <Layout title={title} path="/analysis-updates" centerTitle>
      <Container className={blogStyles.container}>
        <BlogCategoriesList />
        <BlogTeaserList items={data.allContentfulBlogPost.nodes} />
      </Container>
      <BlogPagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  )
}

export default BlogPageTemplate

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { fields: publishDate, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        title
        updateDateTime
        slug
        overrideBlogPage
        overrideBlogPath
        categories {
          name
          slug
        }
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
