import React from 'react'
import renderer from 'react-test-renderer'
import BlogTeaserList from '~components/pages/blog/blog-teaser-list'

const items = [
  {
    authors: [
      {
        name: 'test name',
        twitterLink: 'https://twitter.com/test',
        headshot: {
          file: {
            fileName: 'file.png',
          },
          resize: {
            src: '//images.ctfassets.net/arandomfile',
          },
        },
      },
      {
        name: 'test name II',
        twitterLink: 'https://twitter.com/testii',
        headshot: {
          file: {
            fileName: 'file2.png',
          },
          resize: {
            src: '//images.ctfassets.net/aspecificfile',
          },
        },
      },
    ],
    publishDate: 'Aug 1 2020',
    slug: 'we-made-a-blog-post',
    title: 'We Made a Blog Post',
    lede: {
      lede: 'Huh, this blog thing seems to be working! This is the lede.',
    },
  },
  {
    authors: [
      {
        name: 'test name',
        twitterLink: 'https://twitter.com/test',
        headshot: {
          file: {
            fileName: 'file.png',
          },
          resize: {
            src: '//images.ctfassets.net/arandomfile',
          },
        },
      },
      {
        name: 'test name II',
        twitterLink: 'https://twitter.com/testii',
        headshot: {
          file: {
            fileName: 'file2.png',
          },
          resize: {
            src: '//images.ctfassets.net/aspecificfile',
          },
        },
      },
    ],
    publishDate: 'Apr 15 2020',
    slug: 'new-blog-post',
    title: 'New Blog Post',
    lede: {
      lede: 'This is a new blog post, not an old one.',
    },
  },
]

describe('Components : Pages : Blog : Blog Teaser List', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BlogTeaserList items={items} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
