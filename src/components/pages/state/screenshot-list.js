import React from 'react'
import screenshotListStyles from './screenshot-list.module.scss'
import { FormatDate } from '~components/utils/format'

export default ({ screenshots }) => (
  <ul className={screenshotListStyles.screenshots}>
    {screenshots.map(screenshot => (
      <li>
        <a href={screenshot.url} target="_blank" rel="noopener noreferrer">
          {screenshot.dateChecked && (
            <FormatDate date={screenshot.dateChecked} format="h:mm a" />
          )}
        </a>
      </li>
    ))}
  </ul>
)
