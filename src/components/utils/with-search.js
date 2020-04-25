/* eslint-disable */
import React from 'react'
import withLocation from './with-location'
import { SearchProvider, useSearchDispatch } from '../../context/search-context'
const withSearch = Comp => props => {
  const CompWithLocation = withLocation(({ search }) => 
    <SearchProvider>
      <Comp {...props} search={search} />
    </SearchProvider>
  )
  return <CompWithLocation />
}

export default withSearch
