/* eslint jsx-a11y/label-has-associated-control: 0 */

import React, { useState } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import stateNavStyles from './state-nav.module.scss'

export const getStateId = (stateList, selectedItem) =>
  stateList.find(node => {
    return node.name === selectedItem
  })

export const setWindowLocation = str => {
  window.location.hash = str
}

export const selectFirstItemOnKeyDown = (
  event,
  results,
  setWindowLocationFn = setWindowLocation,
) => {
  if (event.key !== 'Enter') {
    return
  }
  if (results && results.length === 1 && typeof window !== 'undefined') {
    setWindowLocationFn(`state-${results[0].state.toLowerCase()}`)
  }
}

export default ({ title, stateList }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const searchStates = term => {
    if (term.trim() === '') {
      return null
    }
    const results = []
    stateList.forEach(node => {
      if (node.name.toLowerCase().search(term.toLowerCase().trim()) === 0) {
        results.push(node)
      }
    })
    return results
  }

  const results = searchStates(searchTerm)

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
            <ComboboxInput
              id="jump-to-state"
              placeholder="State or territory"
              autoComplete="false"
              onKeyDown={event => selectFirstItemOnKeyDown(event, results)}
              onChange={event => {
                setSearchTerm(event.target.value)
              }}
            />
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
