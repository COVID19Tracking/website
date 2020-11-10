/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react'
import { navigate } from 'gatsby'

import SearchFilters from '~components/pages/search/filters'
import SearchNoResults from '~components/search/search-no-results'
import SearchResultSection from '~components/search/search-result-section'
import withSearch from '~components/utils/with-search'
import Search from './search'
import {
  types,
  useSearch,
  getHighlightResultOrExcerpt,
  getSanitizedSlug,
} from '~context/search-context'

import searchStyle from './search.module.scss'

const SearchAndResults = withSearch(({ search }) => {
  const [searchState, searchDispatch] = useSearch()
  const { query, results } = searchState

  const totalHits =
    query &&
    (results[types.STATE].nbHits || 0) +
      (results[types.BLOG_POST].nbHits || 0) +
      (results[types.PAGE].nbHits || 0)

  const filterOptions = [
    {
      id: 'all',
      name: 'All', // this is the default
      deactivated: false,
    },
    {
      id: 'blog-posts',
      name: 'Blog posts',
      deactivated: results[types.BLOG_POST].nbHits === 0,
    },
    {
      id: 'pages',
      name: 'Pages',
      deactivated: results[types.PAGE].nbHits === 0,
    },
    {
      id: 'states',
      name: 'States',
      deactivated: results[types.STATE].nbHits === 0,
    },
  ]

  const [currentFilterOptionID, setCurrentFilterOptionID] = useState(
    filterOptions[0].id,
  ) // make "All" the default

  const isDisplaySection = sectionTypeID => {
    if (currentFilterOptionID === sectionTypeID) {
      return true
    }
    if (currentFilterOptionID === 'all') {
      return true
    }
    return false
  }

  return (
    <div className={searchStyle.wrapper}>
      <div className={searchStyle.search}>
        <Search
          query={query}
          search={search}
          navigate={navigate}
          searchDispatch={searchDispatch}
          searchState={searchState}
        />
      </div>
      {totalHits > 0 ? (
        <>
          <span className={searchStyle.resultsLabel}>
            <strong>{totalHits}</strong>{' '}
            {totalHits === 1 ? 'result' : 'results'} found for &ldquo;{query}
            &rdquo;
          </span>
          <SearchFilters
            options={filterOptions}
            currentOptionID={currentFilterOptionID}
            setCurrentOptionID={setCurrentFilterOptionID}
          />
          <div className={searchStyle.searchResults}>
            {/* State results */}
            {isDisplaySection('states') && (
              <SearchResultSection
                query={query}
                results={results[types.STATE]}
                type="State"
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
            )}

            {/* Blog post results */}
            {isDisplaySection('blog-posts') && (
              <SearchResultSection
                query={query}
                results={results[types.BLOG_POST]}
                type="Blog post"
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
            )}

            {/* Pages results */}
            {isDisplaySection('pages') && (
              <SearchResultSection
                query={query}
                results={results[types.PAGE]}
                type="Page"
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
            )}
          </div>
        </>
      ) : (
        <SearchNoResults query={query} />
      )}
    </div>
  )
})

export default SearchAndResults
