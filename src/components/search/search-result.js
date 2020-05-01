import React from 'react'
import { Link } from 'gatsby'
import DetailText from '~components/common/detail-text'
import resultStyle from './search-result.module.scss'

const SearchResult = ({
  title,
  url,
  publishDate,
  author,
  children = false,
}) => (
  <div className={resultStyle.result}>
    <h4>
      <Link to={url}>{title}</Link>
    </h4>
    <div>{children}</div>
    {(publishDate || author) && (
      <DetailText>
        {publishDate && (
          <span className={resultStyle.publishDate}>{publishDate}</span>
        )}
        {publishDate && author && (
          <span dangerouslySetInnerHTML={{ __html: ' &middot; ' }} />
        )}
        {author && author}
      </DetailText>
    )}
  </div>
)

export default SearchResult
