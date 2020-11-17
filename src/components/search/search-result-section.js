import React from 'react'
import SearchResult from './search-result'
import sectionStyle from './search-result-section.module.scss'

const SearchResultSection = ({
  results,
  type,
  itemKey,
  itemTitle,
  itemUrl,
  authors,
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
            type={type}
            url={itemUrl(item)}
            allAuthors={authors}
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
