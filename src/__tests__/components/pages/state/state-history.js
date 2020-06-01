import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import sampleScreenshots from 'screenshots'
import sampleHistory from 'state-history'
import StateHistory from '~components/pages/state/state-history'

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
