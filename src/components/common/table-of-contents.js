import React from 'react'
import tocStyle from './table-of-contents.module.scss'

const TableOfContents = ({ headings }) => (
  <div className={tocStyle.tableOfContents}>
    <h2>Table of contents</h2>
    <ul>
      {headings.map(heading => (
        <li
          key={`toc-${heading.id}`}
          className={heading.depth > 1 && tocStyle.subItem}
        >
          {heading.depth === 1 ? (
            <strong>{heading.value}</strong>
          ) : (
            <a href={`#${heading.id}`}>{heading.value}</a>
          )}
        </li>
      ))}
    </ul>
  </div>
)

export const TableOfContentsWrapper = ({ children }) => (
  <div className={tocStyle.tableOfContents}>{children}</div>
)

export default TableOfContents
