import React from 'react'
import renderer from 'react-test-renderer'
import { StateLinks } from '~components/pages/state/state-links'

describe('Components : Pages : State : State links', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StateLinks
          stateName="California"
          twitter="california-covid"
          covid19Site="https://example.com"
          covid19SiteSecondary="https://example.com2"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const covid19SiteTree = renderer
      .create(
        <StateLinks
          stateName="California"
          twitter="california-covid"
          covid19Site="https://example.com"
          covid19SiteSecondary="https://example.com2"
        />,
      )
      .toJSON()
    expect(covid19SiteTree).toMatchSnapshot()
  })
})
