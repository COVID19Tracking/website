import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import algoliasearch from 'algoliasearch'
import { prefixSearchIndex } from '../utilities/algolia'
import Layout from '../components/layout'
import withLocation from '../components/utils/with-location'
import pressListStyle from '../components/common/press-list.module.scss'
import { PublicationTitle } from '../components/common/publication'
import DetailText from '../components/common/detail-text'

export default withLocation(({ search }) => {
  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  )

  const [query, setQuery] = useState(search.q || '')
  const [results, setResults] = useState({
    states: {},
    blogPosts: {},
  })
  const stateIndex = client.initIndex(prefixSearchIndex('states'))
  const blogIndex = client.initIndex(prefixSearchIndex('blog_posts'))

  /* eslint-disable */
  
  async function queryIndex(index) {
    try {
      const hits = await index.search(query)
      return hits
    } catch (e) {
      console.error(e)
      return []
    }
  }
  
  useEffect(() => {
    async function fetchResults() {
      const [states, blogPosts] = await Promise.all([
        queryIndex(stateIndex),
        queryIndex(blogIndex),
      ])

      setResults({
        states,
        blogPosts,
      })
      console.log(states, blogPosts)
    }
    if (search.q) {
      fetchResults()
    }
  }, [])

  const totalHits = (results.states.nbHits || 0) + (results.blogPosts.nbHits || 0)
  const hitsInfo = query.length ? ` : ${query} (${totalHits} result${totalHits === 1 ? '' : 's'})` : ''
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
              setQuery(event.target.value)
            }}
          />
        </label>
        <button
          type="submit"
          onClick={async event => {
            event.preventDefault()
            await 
            stateIndex
              .search(query)
              .then(({ hits }) => {
                results.states = hits
                console.log(hits) // eslint-disable-line
                setResults(results)
              })
              .catch(err => {
                console.log(err) // eslint-disable-line
              })
            blogIndex
              .search(query)
              .then(({ hits }) => {
                results.blogPosts = hits
                console.log(hits) // eslint-disable-line
                setResults(results)
              })
              .catch(err => {
                console.log(err) // eslint-disable-line
              })
          }}
        >
          Search
        </button>
      </form>
      <div id="searchResults">
        {results.states.nbHits > 0 && <h3>States ({results.states.nbHits})</h3>}
        {results.states.nbHits > 0 && results.states.hits.map(state => (
          <div key={state.state}>
            <PublicationTitle>
              <Link to={state.slug}>{state.name}</Link>
            </PublicationTitle>
          </div>
        ))}

        {results.blogPosts.nbHits > 0 && <h3>Blog Posts ({results.blogPosts.nbHits})</h3>}
        {results.blogPosts.nbHits > 0 && results.blogPosts.hits.map(post => (
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
      </div>
    </Layout>
  )
})
