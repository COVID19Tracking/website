import React from 'react'
import renderer from 'react-test-renderer'
import PressContainer from '~components/pages/race/press-container'

describe('Components : Race : Press Container', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <PressContainer>
          <span>this is a child</span>
        </PressContainer>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
