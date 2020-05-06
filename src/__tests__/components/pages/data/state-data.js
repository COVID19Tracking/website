import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import sampleState from 'sample-state'
import StateData from '../../../../components/pages/data/state-data'

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
      .create(<StateData state={sampleState.state} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
