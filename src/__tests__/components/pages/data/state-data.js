import React from 'react'
import renderer from 'react-test-renderer'
import StateData from '../../../../components/pages/data/state-data'
import sampleState from 'sample-state'

describe('Components : Pages : Data : State data', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<StateData state={sampleState.state} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
