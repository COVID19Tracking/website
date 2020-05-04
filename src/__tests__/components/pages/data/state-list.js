import React from 'react'
import renderer from 'react-test-renderer'
import sampleState from 'sample-state'
import StateList from '../../../../components/pages/data/state-list'

describe('Components : Pages : Data : State data', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StateList
          states={[{ node: sampleState.state }]}
          stateData={[{ node: sampleState.stateData }]}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
