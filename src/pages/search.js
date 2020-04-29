/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react'
import '@reach/combobox/styles.css'
import Layout from '~components/layout'
import withSearch from '~components/utils/with-search'
import searchPageStyle from './search.module.scss'
import pressListStyle from '~components/common/press-list.module.scss'
import SearchResult from '~components/search/search-result'
import {
  searchResultTypes as types,
  useSearch,
  querySearch,
  getHighlightResultOrExcerpt,
  getSanitizedSlug,
} from '~context/search-context'

export default withSearch(({ search }) => {
  const [searchState, searchDispatch] = useSearch()
  const { query, results } = searchState

  let searchEvent

  function setQuery(value) {
    return searchDispatch({ type: 'setQuery', payload: value })
  }

  useEffect(() => {
    if (search.q) {
      setQuery(search.q)
    }
  }, [])

  useEffect(() => {
    if (query) {
      querySearch(searchState, searchDispatch)
    }
  }, [query])

  const totalHits =
    (results[types.STATE].nbHits || 0) +
    (results[types.BLOG_POST].nbHits || 0) +
    (results[types.PAGE].nbHits || 0)
  const hitsInfo = query.length
    ? ` : ${query} (${totalHits} result${totalHits === 1 ? '' : 's'})`
    : ''

  return (
    <Layout title="Search">
      <form className={searchPageStyle.searchForm}>
        <h2 className="hed-primary">Search{hitsInfo}</h2>
        <label htmlFor="item">
          Search
          <input
            type="text"
            aria-label="Search"
            id="item"
            onChange={event => {
              clearTimeout(searchEvent)
              const { value } = event.currentTarget
              searchEvent = setTimeout(() => {
                setQuery(value)
              }, 500)
            }}
          />
        </label>
        <button
          type="submit"
          onClick={async event => {
            event.preventDefault()
            await querySearch(searchState, searchDispatch)
          }}
        >
          Search
        </button>
      </form>
      {searchState.isFetching && (
        <div>
          <img
            src="https://d1j8pt39hxlh3d.cloudfront.net/products/previews/RES3POBSZ353HFVPZOKR/2329_kKbUTLGEVXhuOIJqrT7QvIJFAXvEpQ3z.gif"
            alt="Searching..."
          />
          <h3>Searching...</h3>
        </div>
      )}
      <div className={searchPageStyle.searchResults}>
        {/* State results */}
        {results[types.STATE].nbHits > 0 && !searchState.isFetching && (
          <div className={searchPageStyle.searchResultsSection}>
            <h3>States ({results[types.STATE].nbHits})</h3>
            {results[types.STATE].hits.map(state => (
              <SearchResult
                key={state.state}
                title={state.name}
                url={getSanitizedSlug(types.STATE, state)}
              />
            ))}
          </div>
        )}

        {/* Blog post results */}
        {results[types.BLOG_POST].nbHits > 0 && !searchState.isFetching && (
          <div className={searchPageStyle.searchResultsSection}>
            <h3>Blog Posts ({results[types.BLOG_POST].nbHits})</h3>
            {results[types.BLOG_POST].hits.map(post => (
              <SearchResult
                key={post.objectID}
                title={post.title}
                url={getSanitizedSlug(types.BLOG_POST, post)}
              >
                {post.author_name}
                <span className={pressListStyle.dotSeparator}>•</span>
                {post.publishDate}
              </SearchResult>
            ))}
          </div>
        )}

        {/* Pages results */}
        {results[types.PAGE].nbHits > 0 && !searchState.isFetching && (
          <div className={searchPageStyle.searchResultsSection}>
            <h3>Pages ({results[types.PAGE].nbHits})</h3>
            {results[types.PAGE].hits.map(page => (
              <SearchResult
                key={page.objectID}
                url={getSanitizedSlug(types.PAGE, page)}
                title={page.title}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: getHighlightResultOrExcerpt('page', page),
                  }}
                />
              </SearchResult>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
})
