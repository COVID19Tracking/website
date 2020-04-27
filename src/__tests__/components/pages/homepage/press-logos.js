import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import PressLogos from '../../../../components/pages/homepage/press-logos'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    allHomepagePressYaml: {
      edges: [
        {
          node: {
            name: 'test A',
            logo: 'test-a.png',
            width: 300,
            featured: false,
          },
        },
        {
          node: {
            name: 'test B',
            logo: 'test-b.png',
            width: 300,
            featured: true,
          },
        },
        {
          node: {
            name: 'test C',
            logo: 'test-c.png',
            width: 400,
            featured: true,
          },
        },
      ],
    },
  }))
})

describe('Components : Pages : Homepage : Press logos', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PressLogos />).toJSON()
    expect(tree).toMatchSnapshot()

    const treeFeatured = renderer.create(<PressLogos onlyFeatured />).toJSON()
    expect(treeFeatured).toMatchSnapshot()

    const treeExtraMargin = renderer.create(<PressLogos extraMargin />).toJSON()
    expect(treeExtraMargin).toMatchSnapshot()
  })
})
