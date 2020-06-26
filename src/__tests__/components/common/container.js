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

describe('Components : Common: Container: Centered', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Container centered>
          <p>Sample child</p>
        </Container>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Common: Container: Narrow', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Container narrow>
          <p>Sample child</p>
        </Container>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
