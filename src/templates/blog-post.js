import React from 'react'
import { graphql } from 'gatsby'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import AuthorFooter from '../components/pages/blog/author-footer'
import Categories from '../components/pages/blog/categories'
import ImageContentBlock from '../components/pages/blog/image-content-block'
import Layout from '../components/layout'
import Lede from '../components/pages/blog/blog-lede'
import RelatedPosts from '../components/pages/blog/related-posts'

import blogPostStyles from './blog-post.module.scss'

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const { image, caption } = node.data.target.fields
      return <ImageContentBlock image={image} caption={caption} />
    },
  },
}

export default ({ data }) => {
  const blogPost = data.allContentfulBlogPost.edges[0].node
  return (
    <Layout title="Blog" titleLink="/blog" textHeavy narrow noMargin>
      <Categories categories={blogPost.categories} />
      <Lede
        headline={blogPost.title}
        authors={blogPost.authors}
        date={blogPost.publishDate}
        lede={blogPost.lede.lede}
        featuredImage={blogPost.featuredImage}
      />
      <div className={blogPostStyles.blogContent}>
        {documentToReactComponents(
          blogPost.childContentfulBlogPostBlogContentRichTextNode.json,
          options,
        )}
      </div>
      <hr />
      <AuthorFooter authors={blogPost.authors} />
      <RelatedPosts posts={blogPost.relatedBlogPosts} />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    allContentfulBlogPost(filter: { id: { eq: $id } }) {
      edges {
        node {
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
          categories {
            name
            slug
          }
          childContentfulBlogPostBlogContentRichTextNode {
            json
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
          relatedBlogPosts {
            authors {
              name
            }
            title
            slug
            publishDate(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`
