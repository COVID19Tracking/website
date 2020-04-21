import React from 'react'
import renderer from 'react-test-renderer'
import ListArrow from '../../../components/common/list-arrow'

describe('Components : Common: Get Involved', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ListArrow items={([<p>Sample text</p>], [<p>More text</p>])} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
