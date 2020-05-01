import React, { useEffect } from 'react'
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
    const resultTypes = Object.values(types)
    resultTypes.forEach(type => {
      const item = results[type].hits.find(result => {
        return result.name === selectedItem || result.title === selectedItem
      })
      if (item && typeof window !== 'undefined') {
        const slug = getSanitizedSlug(type, item)
        navigate(slug)
      }
    })
  }

  const { bestHits, otherHits } = partitionHitsByRelevance(results)

  function toggleFocus() {
    searchDispatch({ type: 'toggleAutocompleteFocus' })
  }

  return (
    <Combobox
      openOnFocus
      onSelect={selectedItem => {
        goToResult(selectedItem)
      }}
    >
      <ComboboxInput
        id={id}
        placeholder="Search"
        autoComplete="off"
        onKeyDown={event => {
          if (event.key === 'Enter') {
            navigate(`/search?q=${event.target.value}`)
          }
        }}
        onChange={event => {
          setQuery(event.currentTarget.value)
        }}
        onFocus={() => toggleFocus()}
        onBlur={() => toggleFocus()}
      />
      {totalHits ? (
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
