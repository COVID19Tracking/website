/* eslint-disable no-restricted-syntax */
import React from 'react'
import withSearch from '~components/utils/with-search'
import SearchNoResults from '~components/search/search-no-results'
import SearchResultSection from '~components/search/search-result-section'

import Search from './search'
import searchStyle from './search.module.scss'

import {
  types,
  useSearch,
  getHighlightResultOrExcerpt,
  getSanitizedSlug,
} from '~context/search-context'

const SearchAndResults = withSearch(({ navigate, search }) => {
  const [searchState, searchDispatch] = useSearch()
  const { query, results } = searchState

  const totalHits =
    query &&
    (results[types.STATE].nbHits || 0) +
      (results[types.BLOG_POST].nbHits || 0) +
      (results[types.PAGE].nbHits || 0)

  return (
    <>
      <Search
        query={query}
        search={search}
        navigate={navigate}
        searchDispatch={searchDispatch}
        searchState={searchState}
      />
      {totalHits > 0 ? (
        <div className={searchStyle.searchResults}>
          <h2>
            {totalHits} {totalHits === 1 ? 'result' : 'results'} matching &quot;
            {query}&quot;
          </h2>
          {/* State results */}
          <SearchResultSection
            query={query}
            results={results[types.STATE]}
            itemKey={state => state.state}
            itemTitle={state => state.name}
            itemUrl={state => getSanitizedSlug(types.STATE, state)}
            itemPublishDate={post => post.updatedAt}
            itemContent={post => (
              <div
                dangerouslySetInnerHTML={{
                  __html: getHighlightResultOrExcerpt('state', post),
                }}
              />
            )}
          />

          {/* Blog post results */}
          <SearchResultSection
            query={query}
            results={results[types.BLOG_POST]}
            itemKey={post => post.objectID}
            itemTitle={post => post.title}
            itemUrl={post => getSanitizedSlug(types.BLOG_POST, post)}
            itemPublishDate={post => post.updatedAt}
            itemAuthor={post => post.author_name}
            itemContent={post => (
              <>
                <p>{post.lede}</p>
              </>
            )}
          />

          {/* Pages results */}
          <SearchResultSection
            query={query}
            results={results[types.PAGE]}
            itemKey={page => page.objectID}
            itemTitle={page => page.title}
            itemUrl={page => getSanitizedSlug(types.PAGE, page)}
            itemPublishDate={page => page.updatedAt}
            itemContent={page => (
              <div
                dangerouslySetInnerHTML={{
                  __html: getHighlightResultOrExcerpt('page', page),
                }}
              />
            )}
          />
        </div>
      ) : (
        <SearchNoResults query={query} />
      )}
    </>
  )
})

export default SearchAndResults
