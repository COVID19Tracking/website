import React from 'react'
import { FormatDate } from '~components/utils/format'
import screenshotListStyles from './screenshot-list.module.scss'

const ScreenshotList = ({ screenshots }) => (
  <ul className={screenshotListStyles.screenshots}>
    {screenshots
      .sort((a, b) => (a.dateChecked > b.dateChecked ? 1 : -1))
      .map(screenshot => (
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

export default ScreenshotList
