import React from 'react'
import { graphql } from 'gatsby'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import AuthorFooter from '~components/pages/blog/author-footer'
import Categories from '~components/pages/blog/categories'
import CleanSpacing from '~components/utils/clean-spacing'
import ImageContentBlock from '~components/pages/blog/image-content-block'
import Layout from '~components/layout'
import Lede from '~components/pages/blog/blog-lede'
import TableContentBlock from '~components/pages/blog/table-content-block'

import blogPostStyles from '~templates/blog-post.module.scss'

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p>
        {children.map(child => (
          <CleanSpacing>{child}</CleanSpacing>
        ))}
      </p>
    ),
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      if (typeof node.data.target.fields === 'undefined') {
        return null
      }
      if (
        node.data.target.sys.contentType.sys.contentful_id ===
        'contentBlockTable'
      ) {
        return (
          <TableContentBlock table={node.data.target.fields.table['en-US']} />
        )
      }
      if (
        node.data.target.sys.contentType.sys.contentful_id ===
        'contentBlockImage'
      ) {
        const { image, caption } = node.data.target.fields
        return <ImageContentBlock image={image} caption={caption} />
      }
      return null
    },
  },
}

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
      <div className={blogPostStyles.blogContent}>
        {documentToReactComponents(
          blogPost.childContentfulBlogPostBlogContentRichTextNode.json,
          options,
        )}
      </div>
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
