import React from 'react'
import renderer from 'react-test-renderer'
import Tooltip from '~components/charts/tooltip'

describe('Components : Charts : Tooltip', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Tooltip top={12} left={30}>
          Test content
        </Tooltip>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const treeNegativeLeft = renderer
      .create(
        <Tooltip top={12} left={-30}>
          Test content
        </Tooltip>,
      )
      .toJSON()
    expect(treeNegativeLeft).toMatchSnapshot()
  })
})
