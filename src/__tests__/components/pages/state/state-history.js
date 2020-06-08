import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import sampleScreenshots from 'screenshots'
import sampleHistory from 'state-history'
import StateHistory from '~components/pages/state/state-history'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    v1Json: {
      buildTime: '2020-06-02T10:16:47.239Z',
    },
  }))
})

describe('Components : Pages : State : State history', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StateHistory
          history={sampleHistory}
          screenshots={sampleScreenshots}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
