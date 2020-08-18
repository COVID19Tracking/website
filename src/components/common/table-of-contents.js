import React from 'react'
import tocStyle from './table-of-contents.module.scss'

export default ({ headings }) => (
  <ul className={tocStyle.tableOfContents}>
    {headings.map(heading => (
      <li key={`toc-${heading.id}`}>
        <a href={`#${heading.id}`}>{heading.value}</a>
      </li>
    ))}
  </ul>
)
