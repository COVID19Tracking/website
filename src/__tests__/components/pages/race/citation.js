import React from 'react'
import renderer from 'react-test-renderer'
import Citation from '~components/pages/race/citation'

describe('Components : Race : Citation', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Citation>
          <p>component children</p>
        </Citation>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
