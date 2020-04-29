import React from 'react'
import SearchResult from './search-result'
import sectionStyle from './search-result-section.module.scss'

const SearchResultSection = ({
  results,
  title,
  itemKey,
  itemTitle,
  itemUrl,
  itemContent = undefined,
}) => {
  return (
    results.nbHits > 0 && (
      <div className={sectionStyle.section}>
        <h3>
          {title} ({results.nbHits})
        </h3>
        {results.hits.map(item => (
          <SearchResult
            key={itemKey(item)}
            title={itemTitle(item)}
            url={itemUrl(item)}
          >
            {typeof itemContent !== 'undefined' && itemContent(item)}
          </SearchResult>
        ))}
      </div>
    )
  )
}

export default SearchResultSection
