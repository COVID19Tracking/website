import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import Datasets from '~components/pages/homepage/datasets'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    whiteHouse: {
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
    },
    covidExit: {
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
    },
  }))
})

describe('Components : Pages : Homepage : Datasets', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Datasets />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
