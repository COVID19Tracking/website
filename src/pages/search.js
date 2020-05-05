/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import Layout from '~components/layout'
import withSearch from '~components/utils/with-search'
import SearchNoResults from '~components/search/search-no-results'
import SearchResultSection from '~components/search/search-result-section'
import searchStyle from './search.module.scss'
import searchIcon from '../images/icons/search-inverted.svg'

import {
  types,
  useSearch,
  querySearch,
  getHighlightResultOrExcerpt,
  getSanitizedSlug,
} from '~context/search-context'

export default withSearch(({ navigate, search }) => {
  const [searchState, searchDispatch] = useSearch()
  const { query, results } = searchState

  function setQuery(value) {
    NProgress.start()
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
    query &&
    (results[types.STATE].nbHits || 0) +
      (results[types.BLOG_POST].nbHits || 0) +
      (results[types.PAGE].nbHits || 0)

  let searchEvent

  return (
    <Layout title="Search results" textHeavy narrow>
      <form
        className={searchStyle.searchForm}
        onSubmit={event => {
          event.preventDefault()
        }}
      >
        <button
          type="button"
          className={searchStyle.searchSubmit}
          aria-label="Submit search"
          onClick={() => query && navigate(`/search?q=${query}`)}
        >
          <img
            src={searchIcon}
            className={searchStyle.searchIcon}
            alt=""
            aria-hidden="true"
          />
        </button>
        <input
          type="search"
          aria-label="Search"
          placeholder="Search..."
          id="item"
          autoComplete="off"
          defaultValue={query || ''}
          onChange={event => {
            clearTimeout(searchEvent)
            const { value } = event.currentTarget
            searchEvent = setTimeout(() => {
              setQuery(value)
              window.history.pushState('', '', `?q=${value}`)
            }, 300)
          }}
        />
      </form>
      {totalHits > 0 ? (
        <div className={searchStyle.searchResults}>
          <h2 className="hed-primary">
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
    </Layout>
  )
})
