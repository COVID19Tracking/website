import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery, StaticQuery } from 'gatsby'
import Layout from '../../../components/layout'

const SampleChildren = <p>Sample content</p>

beforeEach(() => {
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(init => [init, setState])

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
    const tree = renderer
      .create(() => (
        <Layout title="Sample title">
          <SampleChildren />
        </Layout>
      ))
      .toJSON()
    expect(tree).toMatchSnapshot()

    const treeTextHeavy = renderer
      .create(() => (
        <Layout title="Sample title" textHeavy narrow>
          <SampleChildren />
        </Layout>
      ))
      .toJSON()
    expect(treeTextHeavy).toMatchSnapshot()
  })
})
