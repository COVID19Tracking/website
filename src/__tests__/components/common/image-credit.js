import React from 'react'
import renderer from 'react-test-renderer'
import ImageCredit from '~components/common/image-credit'

describe('Components : Common: Image credit', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ImageCredit>
          <p>Sample children</p>
        </ImageCredit>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
