import React from 'react'
import { Link } from 'gatsby'

export default ({ press }) => (
  <ul>
    {press.map(({ node }) => (
      <li key={`press-${node.id}`}>
        <Link to={node.url}>{node.title}</Link>, {node.publication}, {node.publishDate}
      </li>
    ))}
  </ul>
)
