import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import withSearch from '../components/utils/with-search'
import searchPageStyle from './search.module.scss'
import pressListStyle from '../components/common/press-list.module.scss'
import { PublicationTitle } from '../components/common/publication'
import DetailText from '../components/common/detail-text'
import {
  useSearch,
  querySearch,
  getHighlightResultOrExcerpt,
} from '../context/search-context'

export default withSearch(({ search }) => {
  const [searchState, searchDispatch] = useSearch()
  const { query, results } = searchState

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
    (results.states.nbHits || 0) +
    (results.blogPosts.nbHits || 0) +
    (results.pages.nbHits || 0)
  const hitsInfo = query.length
    ? ` : ${query} (${totalHits} result${totalHits === 1 ? '' : 's'})`
    : ''

  let searchEvent

  return (
    <Layout title="Search">
      <h2 className="hed-primary">Search{hitsInfo}</h2>
      <form>
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
        {results.states.nbHits > 0 && !searchState.isFetching && (
          <div className={searchPageStyle.searchResultsSection}>
            <h3>States ({results.states.nbHits})</h3>
            {results.states.hits.map(state => (
              <div key={state.state} className={searchPageStyle.searchResult}>
                <PublicationTitle>
                  <Link to={`${state.slug}`}>{state.name}</Link>
                </PublicationTitle>
              </div>
            ))}
          </div>
        )}

        {/* Blog post results */}
        {results.blogPosts.nbHits > 0 && !searchState.isFetching && (
          <div className={searchPageStyle.searchResultsSection}>
            <h3>Blog Posts ({results.blogPosts.nbHits})</h3>
            {results.blogPosts.hits.map(post => (
              <div key={post.objectID} className={searchPageStyle.searchResult}>
                <PublicationTitle>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </PublicationTitle>
                <DetailText>
                  {post.author_name}
                  <span className={pressListStyle.dotSeparator}>•</span>
                  {post.publishDate}
                </DetailText>
              </div>
            ))}
          </div>
        )}

        {/* Pages results */}
        {results.pages.nbHits > 0 && !searchState.isFetching && (
          <div className={searchPageStyle.searchResultsSection}>
            <h3>Pages ({results.pages.nbHits})</h3>
            {results.pages.hits.map(page => (
              <div key={page.objectID} className={searchPageStyle.searchResult}>
                <PublicationTitle>
                  {/* FIXME this should be handled during indexing 
                  (avoids external Link issues) */}
                  <Link
                    to={`${page.slug[0] === '/' ? page.slug : `/${page.slug}`}`}
                  >
                    {page.title}
                  </Link>
                </PublicationTitle>
                <DetailText>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getHighlightResultOrExcerpt('page', page),
                    }}
                  />
                </DetailText>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
})
