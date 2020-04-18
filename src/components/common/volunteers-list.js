import React from 'react'

export default ({ items }) => {
  return (
    <ul>
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
