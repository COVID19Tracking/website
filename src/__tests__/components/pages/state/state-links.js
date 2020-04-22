import React from 'react'
import renderer from 'react-test-renderer'
import StateLinks from '../../../../components/pages/state/state-links'

describe('Components : Pages : State : State links', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StateLinks
          name="California"
          twitter="california-covid"
          dataSource="https://example.com"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const covid19SiteTree = renderer
      .create(
        <StateLinks
          name="California"
          twitter="california-covid"
          covid19Site="https://example.com"
          dataSource="https://example.com"
        />,
      )
      .toJSON()
    expect(covid19SiteTree).toMatchSnapshot()
  })
})
