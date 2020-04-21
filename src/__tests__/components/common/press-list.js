import React from 'react'
import renderer from 'react-test-renderer'
import PressList from '../../../components/common/press-list'

const pressListItems = [
  {
    node: {
      id: '2',
      url: 'https://covidtracking.com',
      publication: 'COVID Test publication',
      publishDate: 'April 15, 2020',
    },
  },
  {
    node: {
      id: '1',
      url: 'https://covidtracking.com/two',
      publication: 'COVID Test publication two',
      publishDate: 'April 16, 2020',
    },
  },
]

describe('Components : Common: Press list', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PressList items={pressListItems} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
