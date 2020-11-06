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
          description="A description"
          containerStyle="style-class"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const noCaption = renderer
      .create(
        <BlogImage
          imageSource="//imagehosting.com/thisimage"
          imageAlt="Test alt text"
          description="A description"
          containerStyle="style-class"
        />,
      )
      .toJSON()
    expect(noCaption).toMatchSnapshot()

    const noDescription = renderer
      .create(
        <BlogImage
          imageSource="//imagehosting.com/thisimage"
          imageAlt="Test alt text"
          containerStyle="style-class"
        />,
      )
      .toJSON()
    expect(noDescription).toMatchSnapshot()
  })
})
