import React from 'react'

const SearchNoResult = ({ query = false }) =>
  query && (
    <h2>
      No results for &quot;
      {query}&quot;
    </h2>
  )

export default SearchNoResult
