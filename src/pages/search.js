import React, { useState } from 'react'
import algoliasearch from 'algoliasearch'
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
  const stateIndex = client.initIndex('test_states')
  const blogIndex = client.initIndex('test_blog_posts')
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
                setResults(results)
              })
              .catch(err => {
                console.log(err)
              })
            blogIndex
              .search(query)
              .then(({ hits }) => {
                results.blogPosts = hits
                setResults(results)
              })
              .catch(err => {
                console.log(err)
              })
          }}
        >
          Search
        </button>
      </form>
    </Layout>
  )
}
