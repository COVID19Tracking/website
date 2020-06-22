import React from 'react'
import { useSearch } from '~context/search-context'
import styles from './search-button.module.scss'

import searchIcon from '~images/icons/search.svg'
import searchIconInvert from '~images/icons/search-inverted.svg'

export default ({ onClick }) => {
  const [searchState] = useSearch()
  const { autocompleteHasFocus } = searchState

  return (
    <button
      type="button"
      className={styles.searchSubmit}
      aria-label="Submit search"
      onClick={onClick}
    >
      <img
        src={autocompleteHasFocus ? searchIconInvert : searchIcon}
        alt=""
        aria-hidden="true"
      />
    </button>
  )
}
