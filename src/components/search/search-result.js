import React from 'react'
import { Link } from 'gatsby'
import DetailText from '~components/common/detail-text'
import resultStyle from './search-result.module.scss'

const SearchResult = ({ title, url, children = false }) => (
  <div className={resultStyle.result}>
    <h4>
      <Link to={url}>{title}</Link>
    </h4>
    {children && <DetailText>{children}</DetailText>}
  </div>
)

export default SearchResult
