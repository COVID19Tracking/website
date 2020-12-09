import React from 'react'
import renderer from 'react-test-renderer'
import RadioToggle from '~components/common/radio-toggle'

describe('Components : Common: Card', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <RadioToggle
          options={['Last 90 days', 'Full range']}
          state
          setState={() => {}}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
