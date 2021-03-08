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
import stateComboboxStyles from './state-combobox.module.scss'

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
    // ignore key presses that are not 'Enter'
    return
  }
  if (results && results.length > 0 && typeof window !== 'undefined') {
    // select the first state result
    setWindowLocationFn(`state-${results[0].state.toLowerCase()}`)
    return
  }
  if (window.location.hash === '') {
    // set hash to the top of the states list if it isn't already set
    window.location.hash = 'states-top'
  }
}

const StateCombobox = ({ stateList, labelText }) => {
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
    <div
      className={`js-enabled state-nav-combobox ${stateComboboxStyles.stateNavCombobox}`}
    >
      <label htmlFor="jump-to-state">
        {labelText || 'Type a state’s name to jump to it:'}
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
            className={stateComboboxStyles.popover}
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
          <ComboboxPopover className={stateComboboxStyles.popover}>
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
  )
}

export default StateCombobox

export { getStateId, setWindowLocation, selectFirstItemOnKeyDown }
