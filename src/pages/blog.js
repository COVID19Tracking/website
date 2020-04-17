import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Byline from '../components/pages/blog/byline'

export default ({ data }) => (
  <Layout title="Blog" textHeavy narrow>
    {data.allContentfulBlogPost.edges.map(({ node }) => (
      <>
        <h2>
          <Link to={`/blog/${node.slug}`}>{node.title}</Link>
        </h2>
        <Byline author={node.author} date={node.publishDate} />
        <p className="lede">{node.lede}</p>
      </>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: publishDate }) {
      edges {
        node {
          title
          slug
          author {
            name
            twitterLink
          }
          publishDate(formatString: "MMMM D, YYYY")
          lede
        }
      }
    }
  }
`
