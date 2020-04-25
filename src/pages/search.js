import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import withSearch from '../components/utils/with-search'
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
              setQuery(event.currentTarget.value)
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
      <div id="searchResults">
        {/* State results */}
        {results.states.nbHits > 0 && <h3>States ({results.states.nbHits})</h3>}
        {results.states.nbHits > 0 &&
          results.states.hits.map(state => (
            <div key={state.state}>
              <PublicationTitle>
                <Link to={`${state.slug}`}>{state.name}</Link>
              </PublicationTitle>
            </div>
          ))}

        {/* Blog post results */}
        {results.blogPosts.nbHits > 0 && (
          <h3>Blog Posts ({results.blogPosts.nbHits})</h3>
        )}
        {results.blogPosts.nbHits > 0 &&
          results.blogPosts.hits.map(post => (
            <div key={post.objectId}>
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

        {/* Pages results */}
        {results.pages.nbHits > 0 && <h3>Pages ({results.pages.nbHits})</h3>}
        {results.pages.nbHits > 0 &&
          results.pages.hits.map(page => (
            <div key={page.objectID}>
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
    </Layout>
  )
})
