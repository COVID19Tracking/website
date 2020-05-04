import React from 'react'
import renderer from 'react-test-renderer'
import data from 'sample-chart-data'
import BarChart from '../../../components/charts/bar-chart'

describe('Components : Charts: Area chart', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BarChart
          fill="#333"
          data={data}
          xTicks={2}
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
  })
})
