import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import searchStyle from './search.module.scss'
import searchIcon from '~images/icons/search-inverted.svg'

import { querySearch } from '~context/search-context'

const Search = ({ query, search, searchDispatch, searchState, navigate }) => {
  function setQuery(value) {
    NProgress.start()
    return searchDispatch({ type: 'setQuery', payload: value })
  }

  useEffect(() => {
    if (search.q) {
      setQuery(search.q)
    }
  }, [])

  useEffect(() => {
    if (query) {
      querySearch(searchState, searchDispatch)
    }
  }, [query])

  let searchEvent

  return (
    <form
      className={searchStyle.searchForm}
      onSubmit={event => {
        event.preventDefault()
      }}
    >
      <button
        type="button"
        className={searchStyle.searchSubmit}
        aria-label="Submit search"
        onClick={() => query && navigate(`/search?q=${query}`)}
      >
        <img
          src={searchIcon}
          className={searchStyle.searchIcon}
          alt=""
          aria-hidden="true"
        />
      </button>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label htmlFor="search-page-input" className={searchStyle.label}>
        Search
      </label>
      <input
        type="search"
        id="search-page-input"
        name="search"
        autoComplete="off"
        defaultValue={query || ''}
        onChange={event => {
          clearTimeout(searchEvent)
          const { value } = event.currentTarget
          searchEvent = setTimeout(() => {
            setQuery(value)
            window.history.pushState('', '', `?q=${value}`)
          }, 300)
        }}
      />
      {/* eslint-enable jsx-a11y/label-has-associated-control */}
    </form>
  )
}

export default Search
