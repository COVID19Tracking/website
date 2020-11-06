/* eslint-disable camelcase */
import React from 'react'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import LongContent from '~components/common/long-content'
import CleanSpacing from '~components/utils/clean-spacing'
import TableContentBlock from './content-blocks/table-content-block'
import ImageContentBlock from './content-blocks/image-content-block'
import FootnoteContentBlock from './content-blocks/footnote-content-block'
import RelatedPostsContentBlock from './content-blocks/related-posts-block'
import TableauChart from '~components/charts/tableau'
import blogContentStyles from './blog-content.module.scss'

const BlogContent = ({ content }) => {
  let footnoteNumber = 0
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p>
          {children.map(child => (
            <CleanSpacing>{child}</CleanSpacing>
          ))}
        </p>
      ),
      [INLINES.EMBEDDED_ENTRY]: node => {
        const { target } = node.data
        const { __typename } = target
        if (__typename === 'ContentfulContentBlockFootnote') {
          footnoteNumber += 1
          return <FootnoteContentBlock number={footnoteNumber} />
        }
        return null
      },
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        const { target } = node.data
        const { __typename } = target
        if (__typename === 'ContentfulContentBlockTable') {
          return <TableContentBlock table={target.table.table} />
        }
        if (__typename === 'ContentfulContentBlockRelatedPosts') {
          const { headline, subtitle, relatedPosts } = target
          return (
            <RelatedPostsContentBlock
              headline={headline}
              subtitle={subtitle && subtitle.childMarkdownRemark.html}
              references={relatedPosts}
            />
          )
        }
        if (__typename === 'ContentfulContentBlockTableauChart') {
          const { contentful_id, url, height, mobileUrl } = target
          return (
            <TableauChart
              id={contentful_id}
              viewUrl={url}
              viewUrlMobile={mobileUrl}
              height={height}
            />
          )
        }
        if (__typename === 'ContentfulContentBlockImage') {
          const { image, caption, keepSize, fullWidthMobile } = target
          return (
            <ImageContentBlock
              image={image}
              caption={caption}
              keepSize={keepSize && keepSize['en-US']}
              fullWidthMobile={fullWidthMobile && fullWidthMobile['en-US']}
              className={blogContentStyles.image}
              imageUrl={image.url}
            />
          )
        }
        if (__typename === 'ContentfulContentBlockMarkdown') {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  target.childContentfulContentBlockMarkdownContentTextNode
                    .childMarkdownRemark.html,
              }}
            />
          )
        }
        return null
      },
    },
  }
  return (
    <LongContent>
      <div className={blogContentStyles.content}>
        {content && renderRichText(content, options)}
      </div>
    </LongContent>
  )
}

export default BlogContent
