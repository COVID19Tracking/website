import React, { useEffect } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import withSearch from '../utils/with-search'
import {
  searchResultTypes,
  useSearch,
  querySearch,
} from '../../context/search-context'
import searchAutocompleteStyles from './search-autocomplete.module.scss'

export default withSearch(() => {
  const [searchState, searchDispatch] = useSearch()
  const { query, results } = searchState

  function setQuery(value) {
    return searchDispatch({ type: 'setQuery', payload: value })
  }

  useEffect(() => {
    if (query) {
      querySearch(searchState, searchDispatch)
    }
  }, [query])

  const totalHits =
    (results[searchResultTypes.STATE].nbHits || 0) +
    (results[searchResultTypes.BLOG_POST].nbHits || 0) +
    (results[searchResultTypes.PAGE].nbHits || 0)

  return (
    <Combobox openOnFocus>
      <ComboboxInput
        id="header-search"
        placeholder="Search"
        autoComplete="off"
        onChange={event => {
          setQuery(event.currentTarget.value)
        }}
      />
      {totalHits ? (
        <ComboboxPopover
          portal={false}
          id="search-results-popover"
          className={searchAutocompleteStyles.popover}
        >
          {totalHits > 0 ? (
            <ComboboxList aria-label="Results">
              {results[searchResultTypes.STATE].hits.slice(0, 10).map(state => (
                <ComboboxOption key={`${state.slug}`} value={`${state.name}`} />
              ))}
              {results[searchResultTypes.BLOG_POST].hits
                .slice(0, 10)
                .map(post => (
                  <ComboboxOption key={`${post.slug}`} value={post.title} />
                ))}
              {results[searchResultTypes.PAGE].hits.slice(0, 10).map(page => (
                <ComboboxOption key={`${page.slug}`} value={page.title} />
              ))}
            </ComboboxList>
          ) : (
            <span style={{ display: 'block', marginTop: 5 }}>
              No results found
            </span>
          )}
        </ComboboxPopover>
      ) : (
        false
      )}
    </Combobox>
  )
})
