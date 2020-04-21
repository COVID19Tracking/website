import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery, StaticQuery } from 'gatsby'
import Header from '../../../components/layout/header'

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
    allNavigationYaml: {
      edges: [
        {
          node: {
            items: [
              {
                link: '/test-a',
                title: 'Test A',
              },
              {
                link: '/test-b',
                title: 'Test B',
              },
            ],
          },
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
  })
})
