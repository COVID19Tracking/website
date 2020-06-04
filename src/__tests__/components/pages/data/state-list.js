import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import sampleState from 'sample-state'
import StateList from '~components/pages/data/state-list'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    site: {
      siteMetadata: {
        buildDate: '6:00 pm ET',
        inDST: false,
      },
    },
  }))
})

describe('Components : Pages : Data : State data', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StateList
          states={[sampleState.state]}
          stateData={[sampleState.stateData]}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
