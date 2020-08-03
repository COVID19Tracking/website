import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Form, Select } from '~components/common/form'
import ShareCard from './share'

export default () => {
  const data = useStaticQuery(
    graphql`
      {
        allCovidRaceDataCombined(filter: { state: { ne: "US" } }) {
          nodes {
            stateName
            state
          }
        }
        allCovidRaceDataSeparate(filter: { state: { ne: "US" } }) {
          nodes {
            stateName
            state
          }
        }
      }
    `,
  )

  const states = [
    ...data.allCovidRaceDataCombined.nodes,
    ...data.allCovidRaceDataSeparate.nodes,
  ]
  const [state, setState] = useState(states[0].stateName)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location &&
      window.location.hash
    ) {
      const stateFilter = window.location.hash.replace('#', '')
      const foundState = states.find(node => node.state === stateFilter)
      if (foundState) {
        setState(foundState.stateName)
      }
    }
  }, [])

  states.sort((a, b) => (a.stateName > b.stateName ? 1 : -1))

  return (
    <Form>
      <Select
        label="State or territory"
        id="social-card-state"
        options={states.map(node => node.stateName)}
        isRequired
        onChange={event => {
          setState(event.target.value)
        }}
      />
      <ShareCard state={state} />
    </Form>
  )
}
