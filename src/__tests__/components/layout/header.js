import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery, StaticQuery } from 'gatsby'
import Header from '~components/layout/header'

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
    const tree = renderer.create(<Header title="Sample title" />).toJSON()
    expect(tree).toMatchSnapshot()

    const heroTree = renderer
      .create(<Header title="Sample title" hasHero noMargin />)
      .toJSON()
    expect(heroTree).toMatchSnapshot()

    const linkTree = renderer
      .create(<Header title="Sample title" titleLink="/link" />)
      .toJSON()
    expect(linkTree).toMatchSnapshot()

    const mockNavigation = [
      {
        node: {
          pages: [
            {
              title: 'State by State',
              link: '/data',
            },
            {
              title: 'Totals for the U.S.',
              link: '/data/us-daily',
            },
            {
              title: 'Data API',
              link: '/api',
            },
          ],
        },
      },
    ]
    const navigationTree = renderer
      .create(<Header title="Sample title" navigation={mockNavigation} />)
      .toJSON()
    expect(navigationTree).toMatchSnapshot()
  })
})
