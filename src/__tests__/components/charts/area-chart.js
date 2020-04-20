import React from 'react'
import renderer from 'react-test-renderer'
import data from 'sample-chart-data'
import AreaChart from '../../../components/charts/area-chart'

describe('Components : Charts: Area chart', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <AreaChart
          fill={d => (d === 'Group A' ? '#333' : '#000')}
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
