import React from 'react'
import SearchResult from '~components/search/search-result'
import sectionStyle from '~components/search/search-result-section.module.scss'

const SearchResultSection = ({
  results,
  itemKey,
  itemTitle,
  itemUrl,
  itemContent = undefined,
  itemAuthor = undefined,
  itemPublishDate = undefined,
}) => {
  return (
    results.nbHits > 0 && (
      <div className={sectionStyle.section}>
        {results.hits.map(item => (
          <SearchResult
            key={itemKey(item)}
            title={itemTitle(item)}
            url={itemUrl(item)}
            author={typeof itemAuthor !== 'undefined' && itemAuthor(item)}
            publishDate={
              typeof itemPublishDate !== 'undefined' && itemPublishDate(item)
            }
          >
            {typeof itemContent !== 'undefined' && itemContent(item)}
          </SearchResult>
        ))}
      </div>
    )
  )
}

export default SearchResultSection
