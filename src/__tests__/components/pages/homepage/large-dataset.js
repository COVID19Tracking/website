import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import LargeDataset from '~components/pages/homepage/large-dataset'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    file: {
      relativePath: 'project-large.png',
      childImageSharp: {
        fluid: {
          aspectRatio: 1.3,
          sizes: '(max-width: 1200px) 100vw, 1200px',
          src:
            '/static/d7b5369bedd2904efd15de13fa55daef/f3583/project-large.png',
          srcSet: '/srcset',
          tracedSVG: '[SVG]',
        },
      },
    }
  }))
})

describe('Components : Pages : Homepage : Large Dataset', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <LargeDataset />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
