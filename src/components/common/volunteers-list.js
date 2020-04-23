import React from 'react'
import volunteersListStyles from './volunteers-list.module.scss'

function fixWebsitePrefix(website) {
  if (!website.startsWith('http')) {
    // includes both http and https
    return `http://${website}`
  }
  return website
}

export default ({ items }) => (
  <ul className={volunteersListStyles.list}>
    {items.map(({ node }) => (
      <li key={`volunteer-${node.name}`}>
        {node.website ? (
          <a href={fixWebsitePrefix(node.website)}>{node.name}</a>
        ) : (
          <span>{node.name}</span>
        )}
      </li>
    ))}
  </ul>
)
