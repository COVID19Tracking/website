import React from 'react'
import { DateTime } from 'luxon'
import { FormatDate } from '~components/utils/format'

export default ({ date, screenshots }) => {
  const dateScreenshots = []
  const currentDate = DateTime.fromISO(date).setZone('America/New_York')
  screenshots.forEach(({ node }) => {
    if (
      DateTime.fromISO(node.dateChecked)
        .setZone('America/New_York')
        .hasSame(currentDate, 'day')
    ) {
      dateScreenshots.push(node)
    }
  })
  if (dateScreenshots.length === 0) {
    return null
  }
  return (
    <ul>
      {dateScreenshots.map(screenshot => (
        <li key={screenshot.url}>
          <a href={screenshot.url} target="_blank" rel="noopener noreferrer">
            {screenshot.dateChecked && (
              <FormatDate date={screenshot.dateChecked} format="h:mm a" />
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}
