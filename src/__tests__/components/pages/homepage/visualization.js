import React from 'react'
import renderer from 'react-test-renderer'
import Visualization from '../../../../components/pages/homepage/visualization'

describe('Components : Pages : Homepage : Visualization', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Visualization />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
