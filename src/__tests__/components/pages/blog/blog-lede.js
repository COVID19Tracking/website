import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import BlogLede from '~components/pages/blog/blog-lede'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    site: {
      siteMetadata: {
        siteUrl: 'https://covidtracking.com',
      },
    },
  }))
})

describe('Components : Pages : Blog : Lede', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BlogLede
          headline="Test headline"
          authors={[
            {
              name: 'test name',
              twitterLink: 'https://twitter.com/test',
            },
          ]}
          date="Aug 1 2020"
          lede="This is a test blog lede."
          id="askld-loaks-lopde"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
