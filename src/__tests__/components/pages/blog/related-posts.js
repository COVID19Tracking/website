import React from 'react'
import renderer from 'react-test-renderer'
import RelatedPosts from '~components/pages/blog/related-posts'

describe('Components : Pages : Blog : Byline', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <RelatedPosts
          posts={[
            {
              authors: [
                {
                  name: 'Author Name',
                },
              ],
              title: 'A COVID Blog Post',
              slug: 'a-covid-blog-post',
              publishDate: 'May 6, 2020',
            },
            {
              authors: [
                {
                  name: 'Author Middle Last',
                },
              ],
              title: 'Another Blog Post',
              slug: 'another-blog-post',
              publishDate: 'April 6, 2020',
            },
          ]}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
