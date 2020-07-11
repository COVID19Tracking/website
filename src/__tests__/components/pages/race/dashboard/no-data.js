import React from 'react'
import renderer from 'react-test-renderer'
import NoData from '~components/pages/race/dashboard/no-data'

describe('Components : Race : Dashboard : No Data', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NoData stateName="Arizona" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
