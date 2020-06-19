import React, { useRef } from 'react'
import { navigate } from 'gatsby'
import { useSearch } from '~context/search-context'
import SearchAutocomplete from './search-autocomplete'
import SearchButton from './search-button'
import headerStyle from './header.module.scss'

export default ({ mobile, visible, popoverRef }) => {
  const [searchState, searchDispatch] = useSearch()
  const { query, autocompleteHasFocus } = searchState
  const searchRef = useRef()

  function handleBlur() {
    if (!document.hasFocus()) {
      searchDispatch({
        type: 'setAutocompleteFocus',
        hasFocus: false,
      })
    }
  }

  function handleOutsideClick(e) {
    if (searchRef.current && searchRef.current.contains(e.target)) {
      return
    }

    searchDispatch({
      type: 'setAutocompleteFocus',
      hasFocus: false,
    })

    window.removeEventListener('click', handleOutsideClick)
  }

  function toggleFocusOrQuery() {
    if (autocompleteHasFocus && query) {
      navigate(`/search?q=${query}`)
    }

    if (mobile && autocompleteHasFocus) {
      return
    }

    searchDispatch({
      type: 'setAutocompleteFocus',
      hasFocus: !autocompleteHasFocus,
    })

    window.addEventListener('click', handleOutsideClick)
  }

  return (
    <div
      ref={searchRef}
      className={`${headerStyle.searchInput} ${
        autocompleteHasFocus ? headerStyle.searchInputFocused : ''
      }`}
      onBlur={handleBlur}
    >
      <SearchAutocomplete
        ref={popoverRef}
        mobile={mobile}
        visible={visible}
        onClick={toggleFocusOrQuery}
      />

      <SearchButton toggleFocusOrQuery={toggleFocusOrQuery} />
    </div>
  )
}
