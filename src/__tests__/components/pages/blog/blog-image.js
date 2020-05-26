import React from 'react'
import renderer from 'react-test-renderer'
import BlogImage from '~components/pages/blog/blog-image'

describe('Components : Pages : Blog : Blog Image', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BlogImage
          imageSource="//imagehosting.com/thisimage"
          imageAlt="Test alt text"
          caption="Author Designer / The COVID Tracking Project"
          containerStyle="style-class"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
