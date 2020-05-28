import React from 'react'
import { Link } from 'gatsby'
import DetailText from '~components/common/detail-text'
import resultStyle from '~components/search/search-result.module.scss'

const SearchResult = ({
  title,
  url,
  publishDate,
  author,
  children = false,
}) => (
  <div className={resultStyle.result}>
    <h3>
      <Link to={url}>{title}</Link>
    </h3>
    <div>{children}</div>
    {(publishDate || author) && (
      <DetailText>
        <div className={resultStyle.resultDetails}>
          {publishDate && (
            <span className={resultStyle.publishDate}>
              Updated {publishDate}
            </span>
          )}
          {publishDate && author && (
            <span dangerouslySetInnerHTML={{ __html: ' &middot; ' }} />
          )}
          {author && author}
        </div>
      </DetailText>
    )}
  </div>
)

export default SearchResult
