import React from 'react'
import renderer from 'react-test-renderer'
import { ButtonAnchor, ButtonLink, Button } from '~components/common/button'

describe('Components : Common: Button: Link component button', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ButtonLink to="/somewhere">An internal link</ButtonLink>)
      .toJSON()
    expect(tree).toMatchSnapshot()
    const bigTree = renderer
      .create(
        <ButtonLink to="/somewhere" big>
          A big internal link
        </ButtonLink>,
      )
      .toJSON()
    expect(bigTree).toMatchSnapshot()
  })
})

describe('Components : Common: Button: Anchor element button', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ButtonAnchor href="/somewhere">An external link</ButtonAnchor>)
      .toJSON()
    expect(tree).toMatchSnapshot()
    const bigTree = renderer
      .create(
        <ButtonAnchor href="/somewhere" big>
          A big external link
        </ButtonAnchor>,
      )
      .toJSON()
    expect(bigTree).toMatchSnapshot()
  })
})

describe('Components : Common: Button: Button element', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Button href="/somewhere">A button</Button>)
      .toJSON()
    expect(tree).toMatchSnapshot()
    const bigTree = renderer
      .create(
        <Button href="/somewhere" big>
          A button
        </Button>,
      )
      .toJSON()
    expect(bigTree).toMatchSnapshot()
    const submitTree = renderer
      .create(
        <Button href="/somewhere" type="submit">
          A button
        </Button>,
      )
      .toJSON()
    expect(submitTree).toMatchSnapshot()
  })
})
