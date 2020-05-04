import React from 'react'
import renderer from 'react-test-renderer'
import sampleState from 'sample-state'
import StateData from '../../../../components/pages/data/state-data'

describe('Components : Pages : Data : State data', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<StateData state={sampleState.state} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
