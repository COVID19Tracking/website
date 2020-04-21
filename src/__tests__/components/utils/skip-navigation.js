import React from 'react'
import renderer from 'react-test-renderer'
import SkipNavigation from '../../../components/utils/skip-navigation'

describe('Components : Utilities: Skip navigation link', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SkipNavigation />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
