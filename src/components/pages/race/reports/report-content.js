/* eslint-disable camelcase */
import React from 'react'
import { BLOCKS } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import LongContent from '~components/common/long-content'
import CleanSpacing from '~components/utils/clean-spacing'
import TableauChart from '~components/charts/tableau'
import reportContentStyles from './report-content.module.scss'

const ReportContent = ({ content }) => {
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
            <TableauChart
              id={contentful_id}
              viewUrl={url}
              className={reportContentStyles.chart}
              height={height + 27} // Account for bottom controls
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
