import React from 'react'
import renderer from 'react-test-renderer'
import NoData from '~components/social-media-graphics/race/no-data'

describe('Components : Social Media Graphics : Race : No Data', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NoData stateName="Texas" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Social Media Graphics : Race : No Data : Square', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NoData stateName="Texas" square />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
