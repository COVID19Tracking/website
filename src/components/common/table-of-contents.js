import React from 'react'

export default ({ headings }) => (
  <ul>
    {headings.map(heading => (
      <li key={`toc-${heading.id}`}>
        <a href={`#${heading.id}`}>{heading.value}</a>
      </li>
    ))}
  </ul>
)
