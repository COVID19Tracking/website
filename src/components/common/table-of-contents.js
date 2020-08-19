import React from 'react'
import tocStyle from './table-of-contents.module.scss'

export default ({ headings }) => (
  <div className={tocStyle.tableOfContents}>
    <h2>Table of contents</h2>
    <ul>
      {headings.map(heading => (
        <li key={`toc-${heading.id}`}>
          <a href={`#${heading.id}`}>{heading.value}</a>
        </li>
      ))}
    </ul>
  </div>
)
