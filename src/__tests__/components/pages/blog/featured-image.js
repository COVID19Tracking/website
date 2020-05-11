import React from 'react'
import renderer from 'react-test-renderer'
import FeaturedImage from '~components/pages/blog/featured-image'

describe('Components : Pages : Blog : Featured Image', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <FeaturedImage
          image={{
            resize: {
              src: '//images.ctfassets.net/anexampleimage',
            },
            title: 'An Example Image',
          }}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
