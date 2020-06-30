import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '~components/layout'
import BlogTeaserList from '~components/pages/blog/blog-teaser-list'

export default ({ data, pageContext }) => {
  /* eslint-disable  no-console */

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${(currentPage - 1).toString()}`
  const nextPage = `/blog/${(currentPage + 1).toString()}`
  return (
    <Layout title="Blog" path="/blog" narrow>
      <BlogTeaserList items={data.allContentfulBlogPost.nodes} />
      {!isFirst && (
        <Link to={prevPage} rel="prev">
          ← Previous Page
        </Link>
      )}
      {Array.from({ length: numPages }, (_, i) => (
        <li
          key={`pagination-number${i + 1}`}
          style={{
            margin: 0,
          }}
        >
          <Link
            to={`/blog/${i === 0 ? '' : i + 1}`}
            style={{
              textDecoration: 'none',
              color: i + 1 === currentPage ? '#ffffff' : '',
              background: i + 1 === currentPage ? '#007acc' : '',
            }}
          >
            {i + 1}
          </Link>
        </li>
      ))}
      {!isLast && (
        <Link to={nextPage} rel="next">
          Next Page →
        </Link>
      )}
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
