import React from 'react'
import renderer from 'react-test-renderer'
import data from 'sample-chart-data'
import { BarChart, AnnotationBubble } from '~components/charts/bar-chart'

describe('Components : Charts: Bar chart', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BarChart
          fill="#333"
          data={data}
          height={200}
          width={200}
          marginBottom={30}
          marginTop={30}
          marginLeft={30}
          marginRight={30}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const xAxisTree = renderer
      .create(
        <BarChart
          fill="#333"
          data={data}
          height={200}
          width={200}
          marginBottom={30}
          marginTop={30}
          marginLeft={30}
          marginRight={30}
          lastXTick
        />,
      )
      .toJSON()
    expect(xAxisTree).toMatchSnapshot()
  })
})

describe('Components : Charts: Annotation bubble', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<AnnotationBubble content={{ annotationSymbol: 'A' }} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
