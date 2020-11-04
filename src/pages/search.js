import React, { useState } from 'react'
import Layout from '~components/layout'
import Search from '~components/pages/search'


const SearchPage = () => {
  const [query, setQuery] = useState('')

  const getTitle = () => {
    if (query === '' || query === null) {
      return 'Search results'
    } else {
      return `Search results for “${query}”`
    }
  }

  return (
    <Layout title={getTitle()} centered>
      <Search updateSearch={(query) => setQuery(query)}/>
    </Layout>
  )
}

export default SearchPage
