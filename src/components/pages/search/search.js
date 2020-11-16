import React, { useEffect, useRef } from 'react'
import NProgress from 'nprogress'
import classnames from 'classnames'
import searchIcon from '~images/icons/search-inverted.svg'
import { querySearch } from '~context/search-context'

import searchStyle from './search.module.scss'
import searchHeaderStyle from '~components/layout/header/search/search-autocomplete.module.scss'

const ClearSearchButton = ({ inputRef, searchDispatch }) => {
  return (
    <button
      type="button"
      aria-label="Clear search content"
      className={searchStyle.clear}
      onClick={() => {
        /* eslint-disable no-param-reassign */
        inputRef.current.value = ''
        searchDispatch({ type: 'setQuery', payload: '' }) // fire search update
        inputRef.current.focus() // put cursor in the search box
      }}
    >
      <div>&times;</div>
    </button>
  )
}

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

  const inputRef = useRef()

  let searchEvent

  return (
    <form
      className={searchStyle.searchForm}
      onSubmit={event => {
        event.preventDefault()
      }}
    >
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="search-page-input"
        className={classnames(
          searchHeaderStyle.searchLabel,
          searchStyle.searchLabel,
        )}
      >
        Search
      </label>
      <input
        ref={inputRef}
        type="search"
        id="search-page-input"
        name="search"
        autoComplete="off"
        defaultValue={query || ''}
        className={classnames(
          searchHeaderStyle.searchInput,
          searchStyle.searchInput,
        )}
        onChange={event => {
          clearTimeout(searchEvent)
          const { value } = event.currentTarget
          searchEvent = setTimeout(() => {
            setQuery(value)
            window.history.pushState('', '', `?q=${value}`)
          }, 300)
        }}
      />
      <ClearSearchButton inputRef={inputRef} searchDispatch={searchDispatch} />
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
      {/* eslint-enable jsx-a11y/label-has-associated-control */}
    </form>
  )
}

export default Search
