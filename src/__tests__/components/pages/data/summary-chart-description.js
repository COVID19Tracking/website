import React from 'react'
import renderer from 'react-test-renderer'
import data from 'sample-chart-data'
import SummaryChartDescription from '~components/pages/data/summary-chart-description'

describe('Components : Pages : Data : Summary chart description', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<SummaryChartDescription label="Cases" data={data} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
