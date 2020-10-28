import React, { useState, useEffect } from 'react'
import { Form, Select } from '~components/common/form'
import ShareCard from './share'

export default ({ separateStates, combinedStates, stateInfo }) => {
  const defaultState = {
    state: 'US',
    name: 'United States',
    childSlug: {
      slug: 'united-states',
    },
  }

  const [state, setState] = useState(defaultState)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location &&
      window.location.hash
    ) {
      const stateFilter = window.location.hash.replace('#', '')
      const foundState = stateInfo.find(
        node => node.state.toLowerCase() === stateFilter.toLowerCase(),
      )
      if (foundState) {
        setState(foundState)
      }
    }
  }, [])

  const getNames = states => {
    states.sort((a, b) => (a.name > b.name ? 1 : -1))
    states.unshift(defaultState)
    return states.map(node => node.name)
  }

  const [names] = useState(getNames(stateInfo))

  const getAllStates = (separate, combined, stateDefault) => {
    const allStates = separate.concat(combined)
    allStates.unshift(stateDefault)
    return allStates
  }

  const [allStates] = useState(
    getAllStates(separateStates, combinedStates, defaultState),
  )

  return (
    <Form>
      <Select
        label="State or territory"
        id="social-card-state"
        options={names}
        value={state.name}
        isRequired
        onChange={event => {
          const selectedState = stateInfo.find(
            node => node.name === event.target.value,
          )
          setState(selectedState)
          window.location.hash = `#${selectedState.state}`
        }}
      />
      <ShareCard
        state={state}
        stateRaceData={allStates.find(node => node.name === state.name)}
        combinedStates={combinedStates.map(node => node.state)}
      />
    </Form>
  )
}
