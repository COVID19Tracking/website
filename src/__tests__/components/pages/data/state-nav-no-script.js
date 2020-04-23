import React from 'react'
import renderer from 'react-test-renderer'
import StateNavNoScript from '../../../../components/pages/data/state-nav-no-script'

describe('Components : Pages : Data : Navigation with no JS enabled', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StateNavNoScript
          stateList={[
            {
              node: { state: 'AK' },
            },
            {
              node: { state: 'CA' },
            },
          ]}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
