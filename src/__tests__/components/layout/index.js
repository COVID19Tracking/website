import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery, StaticQuery } from 'gatsby'
import Layout from '~components/layout/index'

beforeEach(() => {
  StaticQuery.mockImplementation(({ render }) =>
    render({
      site: {
        siteMetadata: {
          production: true,
        },
      },
    }),
  )

  useStaticQuery.mockImplementation(() => ({
    site: {
      siteMetadata: {
        title: 'Test site',
      },
    },
    allContentfulNavigationGroup: {
      edges: [
        {
          node: {
            slug: 'test-a',
            pages: [
              {
                title: 'Contentful a',
                link: '/contentful-a',
              },

              {
                title: 'Contentful B',
                link: '/contentful-b',
              },
            ],
          },
        },
      ],
    },
    navigationYaml: {
      items: [
        {
          link: '/test-a',
          title: 'Test A',
          subNavigation: 'test-a',
        },
        {
          link: '/test-b',
          title: 'Test B',
        },
      ],
    },
  }))
})

describe('Components : Layout : Header', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <>
          <Layout title="Sample title">
            <p>Content</p>
          </Layout>
        </>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const textHeavytree = renderer
      .create(
        <>
          <Layout title="Sample title" textHeavy narrow>
            <p>Content</p>
          </Layout>
        </>,
      )
      .toJSON()
    expect(textHeavytree).toMatchSnapshot()

    const displayTitleTree = renderer
      .create(
        <>
          <Layout title="Sample title" displayTitle="Another title">
            <p>Content</p>
          </Layout>
        </>,
      )
      .toJSON()
    expect(displayTitleTree).toMatchSnapshot()
  })
})
