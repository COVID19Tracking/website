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
import stateNavStyles from '../../../scss/components/pages/data/state-nav.module.scss'

export default ({ stateList }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const searchStates = term => {
    if (term.trim() === '') {
      return null
    }
    const results = []
    stateList.forEach(({ node }) => {
      if (node.name.toLowerCase().search(term.toLowerCase().trim()) === 0) {
        results.push(node)
      }
    })
    return results
  }

  const results = searchStates(searchTerm)

  return (
    <div className={`state-nav-combobox ${stateNavStyles.stateNavCombobox}`}>
      <noscript>
        <style>{`
    .state-nav {
      display: none !important;
    }
    `}</style>
      </noscript>
      <label htmlFor="jump-to-state">
        Type a state&apos;s name to jump to it
      </label>
      <Combobox
        openOnFocus
        onSelect={selectedItem => {
          const stateId = stateList.find(({ node }) => {
            return node.name === selectedItem
          })
          if (stateId && typeof window !== 'undefined') {
            window.location.hash = `state-${stateId.node.state.toLowerCase()}`
          }
        }}
      >
        <ComboboxInput
          id="jump-to-state"
          placeholder="State or territory"
          autoComplete="off"
          onKeyDown={event => {
            if (event.key !== 'Enter') {
              return
            }
            if (
              results &&
              results.length === 1 &&
              typeof window !== 'undefined'
            ) {
              window.location.hash = `state-${results[0].state.toLowerCase()}`
            }
          }}
          onChange={event => {
            setSearchTerm(event.target.value)
          }}
        />
        {results ? (
          <ComboboxPopover className={stateNavStyles.popover}>
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
              {stateList.map(({ node }) => (
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
