import React from 'react'
import renderer from 'react-test-renderer'
import StateNavWrapper from '~components/pages/data/state-nav-wrapper'

const stateList = [
  {
    state: 'CA',
    childSlug: {
      slug: 'california',
    },
  },
  {
    state: 'NM',
    childSlug: {
      slug: 'new-mexico',
    },
  },
]

describe('Components : Pages : Data : State navigation', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StateNavWrapper stateList={stateList}>
          <p>Child paragraph</p>
        </StateNavWrapper>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const singleTree = renderer
      .create(
        <StateNavWrapper stateList={stateList} single>
          <p>Child paragraph</p>
        </StateNavWrapper>,
      )
      .toJSON()
    expect(singleTree).toMatchSnapshot()
  })
})
