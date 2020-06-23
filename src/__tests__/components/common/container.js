import React from 'react'
import renderer from 'react-test-renderer'
import Container from '~components/common/container'

describe('Components : Common: Container', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Container>
          <p>Sample child</p>
        </Container>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
