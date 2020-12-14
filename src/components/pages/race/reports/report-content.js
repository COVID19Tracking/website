/* eslint-disable camelcase */
import React from 'react'
import { BLOCKS } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import LongContent from '~components/common/long-content'
import CleanSpacing from '~components/utils/clean-spacing'
import reportContentStyles from './report-content.module.scss'
import Visualization from './content-blocks/report-viz'

const ReportContent = ({ content, vizImage }) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => (
        <p>
          {children.map(child => (
            <CleanSpacing>{child}</CleanSpacing>
          ))}
        </p>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        const { target } = node.data
        if (typeof target === 'undefined') {
          return null
        }
        const { __typename } = target
        if (__typename === 'ContentfulContentBlockTableauChart') {
          const { contentful_id, url, height } = target
          return (
            <Visualization
              contentfulId={contentful_id}
              url={url}
              height={height}
              vizImage={vizImage}
            />
          )
        }
        return null
      },
    },
  }
  return (
    <LongContent>
      <div className={reportContentStyles.content}>
        {content && renderRichText(content, options)}
      </div>
    </LongContent>
  )
}

export default ReportContent
