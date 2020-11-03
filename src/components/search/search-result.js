import React from 'react'
import { Link } from 'gatsby'
import DetailText from '~components/common/detail-text'
import resultStyle from './search-result.module.scss'

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
        {publishDate && (
          <span className={resultStyle.date}>
            {type == "Blog post" ? "Published" : "Updated"} on {publishDate}
          </span>
        )}
        {author}
      </div>
    )}
  </div>
)

export default SearchResult
