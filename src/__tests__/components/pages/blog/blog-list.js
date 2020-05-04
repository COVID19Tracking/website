import React from 'react'
import renderer from 'react-test-renderer'
import BlogList from '../../../../components/pages/blog/blog-list'

const blogItems = [
  {
    node: {
      id: 'a',
      slug: 'a',
      title: 'Blog list item',
      authors: [
        {
          name: 'test name',
          twitterLink: 'https://twitter.com/test',
        },
        {
          name: 'another test',
        },
      ],
      publishDate: 'August 1, 20202',
    },
  },
]

describe('Components : Pages : Blog : List', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BlogList items={blogItems} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
