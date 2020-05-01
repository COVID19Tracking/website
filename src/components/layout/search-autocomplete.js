import React, { useEffect, useState } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import { navigate } from 'gatsby'
import '@reach/combobox/styles.css'
import {
  types,
  useSearch,
  querySearch,
  getSanitizedSlug,
  partitionHitsByRelevance,
} from '../../context/search-context'
import searchAutocompleteStyles from './search-autocomplete.module.scss'

export default ({ id }) => {
  const [searchState, searchDispatch] = useSearch()
  const [showResults, setShowResults] = useState(true)
  const { query, results } = searchState

  function setQuery(value) {
    if (!value) {
      return searchDispatch({ type: 'clearQuery' })
    }

    return searchDispatch({ type: 'setQuery', payload: value })
  }

  useEffect(() => {
    if (query) {
      querySearch(searchState, searchDispatch)
    }
  }, [query])

  const totalHits =
    results &&
    (results[types.STATE].nbHits || 0) +
      (results[types.BLOG_POST].nbHits || 0) +
      (results[types.PAGE].nbHits || 0)

  const goToResult = selectedItem => {
    setShowResults(false)
    navigate(getSanitizedSlug(selectedItem.type, selectedItem))
  }

  const { bestHits, otherHits } = partitionHitsByRelevance(results)

  function toggleFocus() {
    searchDispatch({ type: 'toggleAutocompleteFocus' })
  }

  return (
    <Combobox openOnFocus>
      <ComboboxInput
        id={id}
        placeholder="Search"
        autoComplete="off"
        onChange={event => {
          setQuery(event.currentTarget.value)
        }}
        onFocus={() => toggleFocus()}
        onBlur={() => toggleFocus()}
      />
      {totalHits && showResults ? (
        <ComboboxPopover
          portal={false}
          id="search-results-popover"
          className={searchAutocompleteStyles.popover}
        >
          {totalHits > 0 ? (
            <ComboboxList
              aria-label="Results"
              className={searchAutocompleteStyles.popoverList}
            >
              {bestHits.length > 0 && (
                <li
                  tabIndex="-1"
                  className={searchAutocompleteStyles.popoverSeparator}
                >
                  Best results
                </li>
              )}
              {bestHits.slice(0, 5).map(item => (
                <ComboboxOption
                  key={`${item.slug}`}
                  value={`${item.type === 'state' ? item.name : item.title}`}
                  onMouseDown={() => goToResult(item)}
                />
              ))}
              {otherHits.length > 0 && (
                <li
                  tabIndex="-1"
                  className={searchAutocompleteStyles.popoverSeparator}
                >
                  Other results
                </li>
              )}
              {otherHits.slice(0, 5).map(item => (
                <ComboboxOption
                  key={`${item.slug}`}
                  value={`${item.type === 'state' ? item.name : item.title}`}
                  onMouseDown={() => goToResult(item)}
                />
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
}
