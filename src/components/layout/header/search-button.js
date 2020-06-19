import React from 'react'
import { useSearch } from '~context/search-context'
import headerStyle from './header.module.scss'

import searchIcon from '~images/icons/search.svg'
import searchIconInvert from '~images/icons/search-inverted.svg'

export default ({ toggleFocusOrQuery }) => {
  const [searchState] = useSearch()
  const { autocompleteHasFocus } = searchState

  return (
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
  )
}
