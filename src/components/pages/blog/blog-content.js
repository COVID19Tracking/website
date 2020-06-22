import React from 'react'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import CleanSpacing from '~components/utils/clean-spacing'
import Container from '~components/common/container'
import TableContentBlock from './table-content-block'
import ImageContentBlock from './image-content-block'
import TableauContentBlock from './tableau-content-block'
import blogContentStyles from './blog-content.module.scss'

export default ({ content, images }) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Container narrow>
          <p>
            {children.map(child => (
              <CleanSpacing>{child}</CleanSpacing>
            ))}
          </p>
        </Container>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        if (
          typeof node.data.target.fields === 'undefined' ||
          typeof node.data.target.sys.contentType === 'undefined'
        ) {
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
          return (
            <TableauContentBlock
              id={`chart-${node.data.target.sys.id}`}
              server={node.data.target.fields.server['en-US']}
              view={node.data.target.fields.view['en-US']}
              embedCode={node.data.target.fields.embedCode['en-US']}
              caption={node.data.target.fields.caption['en-US']}
              height={node.data.target.fields.height['en-US']}
              fallbackImage={node.data.target.fields.fallbackImage['en-US']}
            />
          )
        }
        if (
          node.data.target.sys.contentType.sys.contentful_id ===
          'contentBlockImage'
        ) {
          const { caption } = node.data.target.fields
          return (
            <Container narrow>
              <ImageContentBlock
                image={images[node.data.target.sys.contentful_id].image}
                caption={caption}
              />
            </Container>
          )
        }
        return null
      },
    },
  }
  return (
    <div className={blogContentStyles.content}>
      {documentToReactComponents(content, options)}
    </div>
  )
}
