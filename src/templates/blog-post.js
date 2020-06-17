import React from 'react'
import { graphql } from 'gatsby'
import AuthorFooter from '~components/pages/blog/author-footer'
import Categories from '~components/pages/blog/categories'
import Layout from '~components/layout'
import Lede from '~components/pages/blog/blog-lede'
import BlogPostContent from '~components/pages/blog/blog-content'

export default ({ data, path }) => {
  const blogPost = data.contentfulBlogPost
  const socialCard = blogPost.socialCard || { description: blogPost.lede.lede }
  return (
    <Layout
      title={`Blog | ${blogPost.title}`}
      displayTitle="Blog"
      socialCard={socialCard}
      returnLink="/blog"
      returnLinkTitle="All posts"
      path={path}
      textHeavy
      narrow
    >
      <Categories categories={blogPost.categories} />
      <Lede
        headline={blogPost.title}
        authors={blogPost.authors}
        date={blogPost.publishDate}
        lede={blogPost.lede.lede}
        featuredImage={blogPost.featuredImage}
      />
      <BlogPostContent
        content={blogPost.childContentfulBlogPostBlogContentRichTextNode.json}
      />

      <hr />
      <AuthorFooter authors={blogPost.authors} />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      authors {
        name
        twitterLink
        twitterHandle
        link
        childContentfulAuthorBiographyTextNode {
          childMarkdownRemark {
            html
          }
        }
        headshot {
          file {
            fileName
          }
          resize(width: 200) {
            width
            height
            src
          }
        }
      }
      socialCard {
        description {
          description
        }
        image {
          resize(width: 1200) {
            src
          }
        }
      }
      categories {
        name
        slug
      }
      childContentfulBlogPostBlogContentRichTextNode {
        json
      }
      featuredImage {
        resize(width: 900) {
          src
        }
        title
      }
      slug
      lede {
        lede
      }
      publishDate(formatString: "MMMM D, YYYY")
      childContentfulBlogPostBodyTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
