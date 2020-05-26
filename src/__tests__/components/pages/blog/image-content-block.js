import React from 'react'
import renderer from 'react-test-renderer'
import ImageContentBlock from '~components/pages/blog/image-content-block'

describe('Components : Pages : Blog : Image Content Block', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ImageContentBlock
          image={{
            'en-US': {
              fields: {
                file: {
                  'en-US': {
                    url: '//images.ctfassets.net/anexampleimage',
                  },
                  title: {
                    'en-US': 'This is a test image title',
                  },
                },
                title: 'An Example Image',
              },
            },
          }}
          caption={{
            'en-US': 'This is an image caption',
          }}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
