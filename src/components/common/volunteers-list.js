import React from 'react'
import volunteersListStyles from './volunteers-list.module.scss'

export default ({ items }) => {
  return (
    <ul className={volunteersListStyles.list}>
      {items.map(({ node }) => (
        <li>
          {node.website ? (
            <a href={node.website}>{node.name}</a>
          ) : (
            <span>{node.name}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
