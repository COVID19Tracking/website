import React from 'react'

export default ({ date, screenshots }) => {
  const dateScreenshots = []
  screenshots.forEach(({ node }) => {
    if (parseInt(node.date, 10) === date) {
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
            {screenshot.time}
          </a>
        </li>
      ))}
    </ul>
  )
}
