import React from 'react'
import { Link } from 'gatsby'
import { PublicationTitle } from '~components/common/publication'
import DetailText from '~components/common/detail-text'
import resultStyle from './search-result.module.scss'

const SearchResult = ({ title, url, children = false }) => (
  <div className={resultStyle.result}>
    <PublicationTitle>
      <Link to={url}>{title}</Link>
    </PublicationTitle>
    {children && <DetailText>{children}</DetailText>}
  </div>
)

export default SearchResult
