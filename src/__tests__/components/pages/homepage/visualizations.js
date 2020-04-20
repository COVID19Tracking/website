import React from 'react'
import renderer from 'react-test-renderer'
import Visualizations from '../../../../components/pages/homepage/visualizations'

describe('Components : Pages : Homepage : Visualizations', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Visualizations />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
