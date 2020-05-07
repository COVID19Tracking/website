import React from 'react'
import renderer from 'react-test-renderer'
import Dataset from '~components/pages/homepage/dataset'
import { useStaticQuery } from 'gatsby'

const mockImage = {
  aspectRatio: 1.3,
  sizes: '(max-width: 1200px) 100vw, 1200px',
  src:
    '/static/d7b5369bedd2904efd15de13fa55daef/f3583/project-large.png',
  srcSet: '/srcset',
  tracedSVG: '[SVG]',
}

describe('Components : Pages : Homepage : Dataset', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Dataset title='example title' image={ mockImage } imageAlt='alt text'>
        This is a summary of a source that uses our data
      </Dataset>
    ).toJSON()
    expect(tree).toMatchSnapshot()

    const treeFlipped = renderer.create(
      <Dataset title='example title' image={ mockImage } imageAlt='alt text' flip>
        This is a flipped summary of a source that uses our data
      </Dataset>
    ).toJSON()
    expect(treeFlipped).toMatchSnapshot()
  })
})
