import React from 'react'
import renderer from 'react-test-renderer'
import Footer from '../../../components/layout/footer'

describe('Components : Layout : Footer', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Footer />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
