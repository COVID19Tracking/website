import React from 'react'
import renderer from 'react-test-renderer'
import { OrderedList, UnstyledList } from '~components/common/lists'

const SampleItems = () => (
  <>
    <li>Item A</li>
    <li>Item B</li>
    <li>Item C</li>
  </>
)

describe('Components : Common: Lists: Ordered list', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <OrderedList>
          <SampleItems />
        </OrderedList>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Common: Lists: Unstyled list', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <UnstyledList>
          <SampleItems />
        </UnstyledList>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
