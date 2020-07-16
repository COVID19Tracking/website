import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import HeaderHero from '~components/pages/race/header-hero'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    file: {
      relativePath: 'crdt-landing-header.png',
      childImageSharp: {
        fluid: {
          aspectRatio: 1.3,
          sizes: '(max-width: 1200px) 100vw, 1200px',
          src: '/static/filepath/crdt-landing-header.png',
          srcSet: '/srcset',
          tracedSVG: '[SVG]',
        },
      },
    },
  }))
})

describe('Components : Race : Header Hero', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HeaderHero />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
