/* eslint jsx-a11y/label-has-associated-control: 0 */

import React, { useState, useRef, useLayoutEffect } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import stateNavStyles from './state-nav.module.scss'

const getStateId = (stateList, selectedItem) =>
  stateList.find(node => {
    return node.name === selectedItem
  })

const setWindowLocation = str => {
  window.location.hash = str
}

const selectFirstItemOnKeyDown = (
  event,
  results,
  setWindowLocationFn = setWindowLocation,
) => {
  if (event.key !== 'Enter') {
    // ignore keypresses that 'Enter'
    return
  }
  if (results && results.length === 1 && typeof window !== 'undefined') {
    // update the selected stat if there is only one state
    setWindowLocationFn(`state-${results[0].state.toLowerCase()}`)
    return
  }
  if (window.location.hash === '') {
    // set hash to the top of the states list if it isn't already set
    window.location.hash = 'states-top'
  }
}

const StateNav = ({ title, stateList }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const searchStates = term => {
    if (term.trim() === '') {
      return null
    }
    const results = []
    stateList.forEach(node => {
      if (
        node.name.toLowerCase().search(term.toLowerCase().trim()) === 0 ||
        node.state.toLowerCase().search(term.toLowerCase().trim()) === 0
      ) {
        results.push(node)
      }
    })
    return results
  }

  const results = searchStates(searchTerm)

  const inputRef = useRef()

  useLayoutEffect(() => {
    const handleHashChange = () => inputRef.current.blur()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  })

  return (
    <div className={`state-nav-header ${stateNavStyles.stateNav}`}>
      <div className={stateNavStyles.stateNavInner}>
        <h2 id="states-top">{title}</h2>

        <div
          className={`js-enabled state-nav-combobox ${stateNavStyles.stateNavCombobox}`}
        >
          <label htmlFor="jump-to-state">
            Type a state’s name to jump to it:
          </label>
          <Combobox
            openOnFocus
            onSelect={selectedItem => {
              const stateId = getStateId(stateList, selectedItem)

              if (stateId && typeof window !== 'undefined') {
                window.location.hash = `state-${stateId.state.toLowerCase()}`
              }
            }}
          >
            <label htmlFor="jump-to-state" className="a11y-only">
              Jump to state or territory
            </label>
            <form>
              <ComboboxInput
                id="jump-to-state"
                placeholder="State or territory"
                autoComplete="off"
                ref={inputRef}
                onKeyDown={event => selectFirstItemOnKeyDown(event, results)}
                onChange={event => {
                  setSearchTerm(event.target.value)
                }}
                onSubmit={event => selectFirstItemOnKeyDown(event, results)}
              />
            </form>
            {results ? (
              <ComboboxPopover
                className={stateNavStyles.popover}
                id="state-nav-results-popover"
              >
                {results.length > 0 ? (
                  <ComboboxList aria-label="States">
                    {results.slice(0, 10).map(result => (
                      <ComboboxOption
                        key={`state-search-${result.state}`}
                        value={result.name}
                      />
                    ))}
                  </ComboboxList>
                ) : (
                  <span style={{ display: 'block', margin: 8 }}>
                    No states found
                  </span>
                )}
              </ComboboxPopover>
            ) : (
              <ComboboxPopover className={stateNavStyles.popover}>
                <ComboboxList>
                  {stateList.map(node => (
                    <ComboboxOption
                      key={`state-search-${node.state}`}
                      value={node.name}
                    />
                  ))}
                </ComboboxList>
              </ComboboxPopover>
            )}
          </Combobox>
        </div>
      </div>
    </div>
  )
}

export default StateNav

export { getStateId, setWindowLocation, selectFirstItemOnKeyDown }
