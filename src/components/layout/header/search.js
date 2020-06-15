import React, { useRef } from 'react'
import { navigate } from 'gatsby'
import { useSearch } from '~context/search-context'
import headerStyle from './header.module.scss'

import searchIcon from '~images/icons/search.svg'
import searchIconInvert from '~images/icons/search-inverted.svg'

export default ({ children }) => {
  const [searchState, searchDispatch] = useSearch()
  const { query, autocompleteHasFocus } = searchState
  const searchRef = useRef()

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

    searchDispatch({
      type: 'setAutocompleteFocus',
      hasFocus: !autocompleteHasFocus,
    })

    window.addEventListener('click', handleOutsideClick)
  }

  return (
    <div ref={searchRef} className={headerStyle.searchInput}>
      {children}

      <button
        type="button"
        className={headerStyle.searchSubmit}
        aria-label="Submit search"
        onClick={toggleFocusOrQuery}
      >
        <img
          src={autocompleteHasFocus ? searchIconInvert : searchIcon}
          alt=""
          aria-hidden="true"
        />
      </button>
    </div>
  )
}
