import React from 'react'
import renderer from 'react-test-renderer'
import DetailText from '../../../components/common/detail-text'

describe('Components : Common: Detail text', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <DetailText>
          <p>Sample text</p>
        </DetailText>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
