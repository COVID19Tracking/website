import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import CtaLink from '~components/pages/homepage/cta-link'

describe('Components : Pages : Homepage : Press logos', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <CtaLink to={'/data'}>
        This is a test CtaLink
      </CtaLink>
    ).toJSON()
    expect(tree).toMatchSnapshot()

    const treeCentered = renderer.create(
      <CtaLink to={'/data'} centered>
        This is a centered CtaLink
      </CtaLink>
    ).toJSON()
    expect(treeCentered).toMatchSnapshot()
  })
})
