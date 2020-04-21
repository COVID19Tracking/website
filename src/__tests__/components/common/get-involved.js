import React from 'react'
import renderer from 'react-test-renderer'
import GetInvolved from '../../../components/common/get-involved'

describe('Components : Common: Get Involved', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <GetInvolved items={([<p>Sample text</p>], [<p>More text</p>])} />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
