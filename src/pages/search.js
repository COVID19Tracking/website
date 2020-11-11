import React, { useState } from 'react'
import Layout from '~components/layout'
import Search from '~components/pages/search'

const SearchPage = () => {
  const [query, setQuery] = useState('')
  const getTitle = () => {
    if (query === '' || query === null) {
      return 'Search results'
    }
    return `Search results for “${query}”`
  }
  return (
    <Layout title={getTitle()} centered>
      <Search updateSearch={searchQuery => setQuery(searchQuery)} />
    </Layout>
  )
}
export default SearchPage
