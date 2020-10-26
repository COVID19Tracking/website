import React from 'react'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import marked from 'marked'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import LongContent from '~components/common/long-content'
import CleanSpacing from '~components/utils/clean-spacing'
import TableContentBlock from './content-blocks/table-content-block'
import ImageContentBlock from './content-blocks/image-content-block'
import FootnoteContentBlock from './content-blocks/footnote-content-block'
import RelatedPostsContentBlock from './content-blocks/related-posts-block'
import TableauChart from '~components/charts/tableau'
import blogContentStyles from './blog-content.module.scss'

const BlogContent = ({ content, images }) => {
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
        if (typeof node.data.target.fields === 'undefined') {
          return null
        }
        if (
          node.data.target.sys.contentType.sys.contentful_id ===
          'contentBlockFootnote'
        ) {
          footnoteNumber += 1
          return <FootnoteContentBlock number={footnoteNumber} />
        }
        return null
      },
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
          'contentBlockRelatedPosts'
        ) {
          return (
            <RelatedPostsContentBlock
              headline={node.data.target.fields.headline['en-US']}
              subtitle={
                node.data.target.fields.subtitle &&
                node.data.target.fields.subtitle['en-US']
              }
              references={node.data.target.fields.relatedPosts['en-US']}
            />
          )
        }
        if (
          node.data.target.sys.contentType.sys.contentful_id ===
          'contentBlockTableauChart'
        ) {
          const { url, height, mobileUrl } = node.data.target.fields
          return (
            <TableauChart
              id={node.data.target.sys.contentful_id}
              viewUrl={url['en-US']}
              viewUrlMobile={mobileUrl['en-US']}
              height={height['en-US']}
            />
          )
        }
        if (
          node.data.target.sys.contentType.sys.contentful_id ===
          'contentBlockImage'
        ) {
          const { caption, keepSize, fullWidthMobile } = node.data.target.fields
          return (
            <ImageContentBlock
              image={images[node.data.target.sys.contentful_id].image}
              caption={caption}
              keepSize={keepSize && keepSize['en-US']}
              fullWidthMobile={fullWidthMobile && fullWidthMobile['en-US']}
              className={blogContentStyles.image}
              imageUrl={
                node.data.target.fields.image['en-US'].fields.file['en-US'].url
              }
            />
          )
        }
        if (
          node.data.target.sys.contentType.sys.contentful_id ===
          'contentBlockMarkdown'
        ) {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: marked(node.data.target.fields.content['en-US']),
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
        {documentToReactComponents(content, options)}
      </div>
    </LongContent>
  )
}

export default BlogContent
