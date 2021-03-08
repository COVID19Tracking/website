import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import StateNavWrapper from '~components/common/state-nav-wrapper'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    allCovidStateInfo: {
      nodes: [
        { state: 'CA', name: 'California', childSlug: { slug: 'california' } },
        { state: 'WI', name: 'Wisconsin', childSlug: { slug: 'wisconsin' } },
      ],
    },
  }))
})

describe('Components : Pages : Data : State navigation', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StateNavWrapper>
          <p>Child paragraph</p>
        </StateNavWrapper>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const singleTree = renderer
      .create(
        <StateNavWrapper single>
          <p>Child paragraph</p>
        </StateNavWrapper>,
      )
      .toJSON()
    expect(singleTree).toMatchSnapshot()
  })
})
