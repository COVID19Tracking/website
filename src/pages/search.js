/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react'
import '@reach/combobox/styles.css'
import Layout from '~components/layout'
import withSearch from '~components/utils/with-search'
import searchPageStyle from './search.module.scss'
import pressListStyle from '~components/common/press-list.module.scss'
import SearchLoader from '~components/search/search-loader'
import SearchResultSection from '~components/search/search-result-section'
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
        <input
          type="text"
          aria-label="Search"
          placeholder="Search..."
          id="item"
          defaultValue={query || ''}
          onChange={event => {
            clearTimeout(searchEvent)
            const { value } = event.currentTarget
            searchEvent = setTimeout(() => {
              setQuery(value)
            }, 500)
          }}
        />
      </form>
      {searchState.isFetching && <SearchLoader />}

      <div className={searchPageStyle.searchResults}>
        {/* State results */}
        <SearchResultSection
          results={results[types.STATE]}
          title="States"
          itemKey={state => state.state}
          itemTitle={state => state.name}
          itemUrl={state => getSanitizedSlug(types.STATE, state)}
        />

        {/* Blog post results */}
        <SearchResultSection
          results={results[types.BLOG_POST]}
          title="Blog Posts"
          itemKey={post => post.objectID}
          itemTitle={post => post.title}
          itemUrl={post => getSanitizedSlug(types.BLOG_POST, post)}
          itemContent={post => (
            <>
              {post.author_name}
              <span className={pressListStyle.dotSeparator}>•</span>
              {post.publishDate}
            </>
          )}
        />

        {/* Pages results */}
        <SearchResultSection
          results={results[types.PAGE]}
          title="Pages"
          itemKey={page => page.objectID}
          itemTitle={page => page.title}
          itemUrl={page => getSanitizedSlug(types.PAGE, page)}
          itemContent={page => (
            <div
              dangerouslySetInnerHTML={{
                __html: getHighlightResultOrExcerpt('page', page),
              }}
            />
          )}
        />
      </div>
    </Layout>
  )
})
