import React from 'react'
import { navigate } from 'gatsby'
import { useSearch } from '~context/search-context'
import headerStyle from './header.module.scss'

import searchIcon from '../../../images/icons/search.svg'
import searchIconInvert from '../../../images/icons/search-inverted.svg'

export default ({ children }) => {
  const [searchState] = useSearch()
  const { query, autocompleteHasFocus } = searchState
  return (
    <div className={headerStyle.searchInput}>
      {children}
      <button
        type="button"
        className={headerStyle.searchSubmit}
        aria-label="Submit search"
        onClick={() => query && navigate(`/search?q=${query}`)}
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
