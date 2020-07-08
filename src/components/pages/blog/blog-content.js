import React from 'react'
import { BLOCKS } from '@contentful/rich-text-types'
import marked from 'marked'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import LongContent from '~components/common/long-content'
import CleanSpacing from '~components/utils/clean-spacing'
import TableContentBlock from './table-content-block'
import ImageContentBlock from './image-content-block'
import TableauChart from '~components/charts/tableau'
import blogContentStyles from './blog-content.module.scss'

export default ({ content, images }) => {
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
          const { caption } = node.data.target.fields
          return (
            <ImageContentBlock
              image={images[node.data.target.sys.contentful_id].image}
              caption={caption}
              className={blogContentStyles.image}
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
