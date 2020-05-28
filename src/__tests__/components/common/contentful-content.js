import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    site: {
      siteMetadata: {
        contentfulSpace: '1234',
      },
    },
  }))
})

describe('Components : Common: Contentful content', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ContentfulContent content="<p>This is a paragraph</p>" id="1234" />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with an editor', () => {
    Object.defineProperty(window, 'location', {
      value: {
        search: '?edit',
      },
      writable: true,
    })
    const tree = renderer
      .create(
        <ContentfulContent content="<p>This is a paragraph</p>" id="1234" />,
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree.find(a => a.type === 'a')).toBeTruthy()
  })

  it('renders correctly without an editor', () => {
    Object.defineProperty(window, 'location', {
      value: {
        search: '?q',
      },
      writable: true,
    })
    const tree = renderer
      .create(
        <ContentfulContent content="<p>This is a paragraph</p>" id="1234" />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
