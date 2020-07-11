import React from 'react'
import renderer from 'react-test-renderer'
import CtaLinks from '~components/pages/race/cta-links'

describe('Components : Race : CTA Links', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CtaLinks />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
