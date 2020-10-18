import React from 'react'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import marked from 'marked'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { slugifyList } from '~components/utils/slugify-list'
import CleanSpacing from '~components/utils/clean-spacing'
import TableauChart from '~components/charts/tableau'

import LongContent from './long-content'
import TableContentBlock from './content-blocks/table-content-block'
import ImageContentBlock from './content-blocks/image-content-block'
import FootnoteContentBlock from './content-blocks/footnote-content-block'

import contentStyles from './content.module.scss'

/*

This is for handling rich text content, which we use on our blog
and on some of our Contentful pages

*/

const Content = ({ content, images }) => {
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
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 id={slugifyList(children)}>
          {children.map(child => (
            <CleanSpacing>{child}</CleanSpacing>
          ))}
        </h2>
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
              className={contentStyles.image}
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
      <div className={contentStyles.content}>
        {documentToReactComponents(content, options)}
      </div>
    </LongContent>
  )
}

export default Content
