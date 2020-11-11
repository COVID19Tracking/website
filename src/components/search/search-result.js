import React from 'react'
import { Link } from 'gatsby'
import resultStyle from './search-result.module.scss'

// todo link authors to their websites, etc.
// todo break author names at ', ' and pass to list component

const SearchResult = ({
  title,
  url,
  type,
  publishDate,
  author,
  children = false,
}) => (
  <div className={resultStyle.result}>
    <span className={resultStyle.type}>{type}</span>
    <h3 className={resultStyle.title}>
      <Link to={url}>{title}</Link>
    </h3>
    <div className={resultStyle.childrenContainer}>{children}</div>
    {(publishDate || author) && (
      <div className={resultStyle.resultDetails}>
        {author && <p className={resultStyle.author}>By {author}</p>}
        {publishDate && (
          <p className={resultStyle.date}>
            {type === 'Blog post' ? 'Published' : 'Updated'} on {publishDate}
          </p>
        )}
      </div>
    )}
  </div>
)

export default SearchResult
