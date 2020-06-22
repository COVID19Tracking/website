import React from 'react'
import renderer from 'react-test-renderer'
import SubNavigation from '~components/layout/header/sub-navigation'

describe('Components : Layout : Header : Sub Navigation', () => {
  it('renders correctly', () => {
    const navigation = [
      {
        link: '/about',
        title: 'A subnav item',
      },
      {
        href: 'https://nyan.cat',
        title: 'Another subnav item',
      },
    ]
    const tree = renderer
      .create(<SubNavigation navigation={navigation} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
