/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState, forwardRef } from 'react'
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
} from '~context/search-context'
import searchAutocompleteStyle from './search-autocomplete.module.scss'
import headerStyle from './header.module.scss'

export default forwardRef(({ mobile = false, visible = true }, popoverRef) => {
  const [searchState, searchDispatch] = useSearch()
  const [showResults, setShowResults] = useState(true)
  const searchInputRef = useRef()
  const { query, results, autocompleteHasFocus } = searchState
  const id = `header-search-autocomplete${mobile ? '-mobile' : ''}`

  function setQuery(value) {
    if (!value) {
      return searchDispatch({ type: 'clearQuery' })
    }

    return searchDispatch({ type: 'setQuery', payload: value })
  }

  useEffect(() => {
    if (mobile && searchInputRef.current !== null) {
      searchInputRef.current.blur()
    }
  }, [visible])

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

  /**
   * When a result is selected (here by pressing Enter),
   * try to find a match in search results.
   * Otherwise, the user is likely submitting the input value,
   * so we navigate to the search page using value as the query.
   *
   * @param string currentValue.
   *  Current value of the Combobox Input.
   */
  const goToResultOrSearch = currentValue => {
    setShowResults(false)
    const resultTypes = Object.values(types)

    let match
    resultTypes.forEach(type => {
      const item = results[type].hits.find(result => {
        return result.name === currentValue || result.title === currentValue
      })
      if (item) {
        match = { item, type }
      }
    })
    if (match) {
      navigate(getSanitizedSlug(match.type, match.item))
    } else {
      navigate(`/search?q=${currentValue}`)
    }
  }

  const onItemClick = item => navigate(getSanitizedSlug(item.type, item))

  const { bestHits, otherHits } = partitionHitsByRelevance(results)

  function toggleFocus() {
    searchDispatch({ type: 'toggleAutocompleteFocus' })
  }

  return (
    <Combobox>
      <label
        htmlFor={id}
        className={autocompleteHasFocus ? headerStyle.labelFocus : ''}
      >
        Search
      </label>
      <ComboboxInput
        id={id}
        ref={searchInputRef}
        autoComplete="off"
        onChange={event => {
          setQuery(event.currentTarget.value)
        }}
        onKeyDown={event =>
          event.key === 'Enter' && goToResultOrSearch(event.target.value)
        }
        onSelect={() => {}}
        onFocus={() => toggleFocus()}
        onBlur={() => toggleFocus()}
      />
      {totalHits && showResults ? (
        <ComboboxPopover
          ref={popoverRef}
          portal={false}
          id="search-results-popover"
          className={searchAutocompleteStyle.popover}
        >
          {totalHits > 0 ? (
            <ComboboxList
              aria-label="Results"
              className={searchAutocompleteStyle.popoverList}
            >
              {bestHits.length > 0 && (
                <li
                  tabIndex="-1"
                  className={searchAutocompleteStyle.popoverSeparator}
                >
                  Best results
                </li>
              )}
              {bestHits.slice(0, 5).map(item => (
                <ComboboxOption
                  key={`${item.slug}`}
                  value={`${item.type === 'state' ? item.name : item.title}`}
                  onMouseDown={() => onItemClick(item)}
                />
              ))}
              {otherHits.length > 0 && (
                <li
                  tabIndex="-1"
                  className={searchAutocompleteStyle.popoverSeparator}
                >
                  Other results
                </li>
              )}
              {otherHits.slice(0, 5).map(item => (
                <ComboboxOption
                  key={`${item.slug}`}
                  value={`${item.type === 'state' ? item.name : item.title}`}
                  onMouseDown={() => onItemClick(item)}
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
})
