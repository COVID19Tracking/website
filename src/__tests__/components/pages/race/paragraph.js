import React from 'react'
import renderer from 'react-test-renderer'
import Paragraph from '~components/pages/race/paragraph'

describe('Components : Race : Paragraph', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Paragraph>
          <span>this is a child</span>
        </Paragraph>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
