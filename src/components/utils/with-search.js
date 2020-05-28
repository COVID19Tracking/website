import React from 'react'
import withLocation from '~components/utils/with-location'
import { SearchProvider } from '~context/search-context'

const withSearch = Comp => props => {
  const CompWithLocation = withLocation(({ search }) => (
    <SearchProvider>
      <Comp {...props} search={search} />
    </SearchProvider>
  ))
  return <CompWithLocation />
}

export default withSearch
