import React from 'react'
import renderer from 'react-test-renderer'
import BlogLede from '../../../../components/pages/blog/blog-lede'

describe('Components : Pages : Blog : Lede', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BlogLede
          headline="Test headline"
          author={{
            name: 'test name',
            twitterLink: 'https://twitter.com/test',
          }}
          date="Aug 1 2020"
          lede="This is a test blog lede."
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
