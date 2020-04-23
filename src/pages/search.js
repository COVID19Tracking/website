import React, { useState } from 'react'
import algoliasearch from 'algoliasearch'
import { prefixSearchIndex } from '../utilities/algolia'
import Layout from '../components/layout'

export default () => {
  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  )

  const [query, setQuery] = useState('')
  const [results, setResults] = useState({
    states: [],
    blogPosts: [],
  })
  const stateIndex = client.initIndex(prefixSearchIndex('states'))
  const blogIndex = client.initIndex(prefixSearchIndex('blog_posts'))
  return (
    <Layout title="Search">
      <h2>Search {query}</h2>
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
          onClick={event => {
            event.preventDefault()
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
    </Layout>
  )
}
