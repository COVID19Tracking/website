import React from 'react'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import CleanSpacing from '~components/utils/clean-spacing'
import TableContentBlock from './table-content-block'
import ImageContentBlock from './image-content-block'
import blogContentStyles from './blog-content.module.scss'

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

export default ({ content }) => (
  <div className={blogContentStyles.content}>
    {documentToReactComponents(content, options)}
  </div>
)
