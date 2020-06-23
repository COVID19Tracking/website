import React from 'react'

export default ({ desc, path }) => (
  <p>
    <strong>{desc}: </strong>
    <code>
      <a href={path}>{path}</a>
    </code>
  </p>
)
