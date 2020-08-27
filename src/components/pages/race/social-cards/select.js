import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Form, Select } from '~components/common/form'
import ShareCard from './share'

export default () => {
  const { allCovidStateInfo } = useStaticQuery(
    graphql`
      {
        allCovidStateInfo(filter: { state: { ne: "US" } }) {
          nodes {
            name
            state
            childSlug {
              slug
            }
          }
        }
      }
    `,
  )

  const states = allCovidStateInfo.nodes

  const defaultState = {
    name: '-- Select a state --',
    childSlug: {
      slug: '',
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
      const foundState = states.find(node => node.state === stateFilter)
      if (foundState) {
        setState(foundState.name)
      }
    }
  }, [])

  states.sort((a, b) => (a.name > b.name ? 1 : -1))

  const names = states.map(node => node.name)

  names.unshift(defaultState.name) // prepent the default state to the list

  return (
    <Form>
      <Select
        label="State or territory"
        id="social-card-state"
        options={names}
        isRequired
        onChange={event => {
          setState(states.find(node => node.name === event.target.value))
        }}
      />
      <ShareCard state={state} />
    </Form>
  )
}
