import React from 'react'
import renderer from 'react-test-renderer'
import HeaderSorter from '~components/pages/race/dashboard/header-sorter'

describe('Components : Race : Dashboard : Header Sorter', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<HeaderSorter stateName="Arizona" stateReports="race" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
